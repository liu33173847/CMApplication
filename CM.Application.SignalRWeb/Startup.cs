
using CM.Application.SingalR;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(Startup))]
namespace CM.Application.SingalR
{
    using Microsoft.AspNet.SignalR;
    using CM.Application.SingalRHubs.Config;
    using Owin;

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var container = DiContainerConfiguration.Init();
            GlobalHost.DependencyResolver = new SignalRUnityDependencyResolver(container);
            app.MapSignalR();
        }
    }
}
