
namespace CM.Application.SingalRHubs.Config
{
    using CM.Application.SingalRHubs.CoreApplication;
    using CM.Application.SingalRHubs.CoreApplication.SignalRService;
    using CM.Application.SignalRHost;
    using CM.Application.Core;
    using CM.Application.Common;
    using Microsoft.Practices.Unity;

    public class DiContainerConfiguration
    {
        public static IUnityContainer Init()
        {
            var container = new UnityContainer()
                .RegisterType<CoreApplicationHub>(new InjectionFactory(CreateCoreApplicationHub))
                .RegisterType<ICoreApplication, CoreApplication>()
                .RegisterType<IApplication, Application>()
                .RegisterType<ILogger, Logger>();

            // for point data live hub logging
            Diagnostics.Logger.SetLoggerInstance(container.Resolve<ILogger>());

            return container;
        }

        private static CoreApplicationHub CreateCoreApplicationHub(IUnityContainer p)
        {
            return new CoreApplicationHub(
                new HubServiceHost<ICoreApplication>(
                    p.Resolve<ILogger>(),
                    () => p.Resolve<ICoreApplication>(),
                    "CoreApplicationHub"));
        }
    }
}
