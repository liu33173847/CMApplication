// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
namespace CM.Application.SignalRHost
{
    using System;
    using System.Threading.Tasks;
    using CM.Application.Common;
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;

    [HubName("genericServiceHub")]
    public class ServiceHub<T> : Hub where T : class
    {
        private readonly IHubServiceHost<T> _hubServiceHost;

        private readonly ILogger _logger;       

        public ServiceHub(IHubServiceHost<T> hubServiceHost, ILogger logger)
        {            
            _hubServiceHost = hubServiceHost;
            _logger = logger;
        }
        public virtual dynamic Client
        {
            get { return Clients.Client(Context.ConnectionId); }
        }

        protected ILogger Logger
        {
            get { return _logger; }
        }

        protected virtual T Service
        {
            get { return _hubServiceHost.GetService(Context.ConnectionId); }
        }

        protected T GetService(string connectionId)
        {
            Logger.LogMessage("ServiceHub.GetService", "Getting Service for {0}", connectionId);
            return _hubServiceHost.GetService(connectionId);
        }

        public override Task OnReconnected()
        {
            Logger.LogMessage("ServiceHub.OnReconnected", "Hub reconnected: " + Context.ConnectionId);
            return base.OnReconnected();
        }

        public override Task OnConnected()
        {
            Logger.LogMessage("ServiceHub.OnConnected", "Hub connected: " + Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Logger.LogMessage("ServiceHub.OnDisconnected", "Hub disconnected: " + Context.ConnectionId);
            _hubServiceHost.DisposeService(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }
    }
}