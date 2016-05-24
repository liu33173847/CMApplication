namespace CM.Application.SingalRHubs.Config
{
    using System;
    using System.Collections.Generic;
    using Microsoft.AspNet.SignalR;
    using Microsoft.Practices.Unity;

    public class SignalRUnityDependencyResolver : DefaultDependencyResolver
    {
        private readonly IUnityContainer _container;

        public SignalRUnityDependencyResolver(IUnityContainer container)
        {
            _container = container;
        }

        public override object GetService(Type serviceType)
        {
            if (_container.IsRegistered(serviceType))
            {
                return _container.Resolve(serviceType);
            }
            return base.GetService(serviceType);
        }

        public override IEnumerable<object> GetServices(Type serviceType)
        {
            if (_container.IsRegistered(serviceType))
            {
                return _container.ResolveAll(serviceType);
            }
            return base.GetServices(serviceType);
        }
    }
}
