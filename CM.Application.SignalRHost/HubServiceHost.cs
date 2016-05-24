// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
namespace CM.Application.SignalRHost
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Caching;
    using CM.Application.Common;

    public class HubServiceHost<T> : IHubServiceHost<T> where T : class
    {
        private readonly string _hubName;

        private readonly Func<T> _serviceCreationMethod;

        private Action<T> _serviceDisposingAction;
        private ILogger _logger;

        public HubServiceHost(ILogger logger,Func<T> serviceCreationMethod, string hubName)
        {
            _logger = logger;
            _hubName = hubName;
            _serviceCreationMethod = serviceCreationMethod;
        }

        public void DisposeService(string connectionId)
        {
            _logger.LogMessage("HubServiceHost.DisposeService", "DisposeService {0} {1}", _hubName, connectionId);
            if (ServiceExists(connectionId))
            {
                var service = RemoveExistingService(connectionId);
                try
                {
                    RunDisposeServiceAction(service);
                    DisposeService(service);
                }
                catch (Exception e)
                {
                    _logger.LogException("HubServiceHost.DisposeService",e);
                }
            }
            _logger.LogMessage("HubServiceHost.DisposeService complete", "DisposeService {0} {1}", _hubName, connectionId);
        }

        public T GetService(string connectionId)
        {
            return GetService(connectionId, null, null);
        }

        public T GetService(string connectionId, Action<T> newServiceAction)
        {
            return GetService(connectionId, newServiceAction, null);
        }

        public T GetService(string connectionId, Action<T> newServiceAction, Action<T> serviceDisposingAction)
        {
            _logger.LogMessage("HubServiceHost.GetService", "GetService {0} {1}",_hubName,connectionId);
            if (ServiceExists(connectionId))
            {
                _logger.LogMessage("HubServiceHost.GetService", "Returning existing service {0} {1}", _hubName, connectionId);
                return GetExistingService(connectionId);
            }

            var service = CreateNewService(connectionId);

            newServiceAction?.Invoke(service);

            _serviceDisposingAction = serviceDisposingAction;
            return service;
        }

        private static void DisposeService(T service)
        {

            var disposableService = service as IDisposable;
            disposableService?.Dispose();
        }

        private T CreateNewService(string connectionId)
        {
            _logger.LogMessage("HubServiceHost.CreateNewService", "CreateNewService {0} {1}", _hubName, connectionId);
            var service = _serviceCreationMethod();

            var cachedDictionary = MemoryCache.Default[connectionId];
            if (cachedDictionary == null)
            {
                MemoryCache.Default[connectionId] = cachedDictionary = new Dictionary<string, object>();
            }

            var hubsDictionary = cachedDictionary as Dictionary<string, object>;

            if (hubsDictionary == null)
            {
                return service;
            }

            if (hubsDictionary.ContainsKey(_hubName))
            {
                hubsDictionary[_hubName] = service;
            }
            else
            {
                hubsDictionary.Add(_hubName, service);
            }


            return service;
        }

        private T GetExistingService(string connectionId)
        {
            return GetServiceInstance(connectionId);
        }

        private T GetServiceInstance(string connectionId)
        {
            _logger.LogMessage("HubServiceHost.GetServiceInstance", "GetServiceInstance {0} {1}", _hubName, connectionId);
            var cachedDictionary = MemoryCache.Default[connectionId];
            if (cachedDictionary == null)
            {
                _logger.LogMessage("HubServiceHost.GetServiceInstance", "Returning null (cachedDictionary is null) {0} {1}", _hubName, connectionId);
                return null;
            }
            var hubsDictionary = cachedDictionary as Dictionary<string, object>;
            if (hubsDictionary == null)
            {
                _logger.LogMessage(
                    "HubServiceHost.GetServiceInstance",                    
                    "hubsDictionary is null or could not be cached {0} {1}",
                    _hubName,
                    connectionId);
                return null;
            }
            object hubInDictionary;
            if (!hubsDictionary.TryGetValue(_hubName, out hubInDictionary))
            {
                _logger.LogMessage(
                    "HubServiceHost.GetServiceInstance",                    
                    "hubsDictionary  did not have instance of {0} for {1}",
                    _hubName,
                    connectionId);
                return null;
            }
            var service = hubInDictionary as T;
            return service;
        }

        private T RemoveExistingService(string connectionId)
        {
            _logger.LogMessage("HubServiceHost.RemoveExistingService", "RemoveExistingService {0} {1}", _hubName, connectionId);
            var service = GetService(connectionId);
            var cachedDictionary = MemoryCache.Default[connectionId];
            if (cachedDictionary == null)
            {
                MemoryCache.Default[connectionId] = cachedDictionary = new Dictionary<string, object>();
            }

            var hubsDictionary = cachedDictionary as Dictionary<string, object>;

            if (hubsDictionary == null)
            {
                return service;
            }
            hubsDictionary.Remove(_hubName);
            if (hubsDictionary.Count == 0)
            {
                MemoryCache.Default.Remove(connectionId);
            }
            return service;
        }

        private void RunDisposeServiceAction(T service)
        {
            _serviceDisposingAction?.Invoke(service);
        }

        private bool ServiceExists(string connectionId)
        {
            return (GetServiceInstance(connectionId)) != null;
        }
    }
}