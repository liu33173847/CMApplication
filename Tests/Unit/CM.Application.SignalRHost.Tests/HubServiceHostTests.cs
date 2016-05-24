// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
namespace CM.Application.Tests
{
    using System;
    using FakeItEasy;
    using CM.Application.SignalRHost;
    using CM.Application.Common;
    using NUnit.Framework;

    [TestFixture]
    public class HubServiceHostTests
    {
        private const string DummyConnectionId = "1234";
        private ILogger _logger;

        private void Setup()
        {
            _logger = A.Dummy<ILogger>();
        }

        [Test]
        public void DisposeService_DisposableService_CallsDisposeOnService()
        {
            Setup();
            // Arrange
            var disposableService = A.Fake<IDummyDisposableServiceInterface>();
            var hubServiceHost = new HubServiceHost<IDummyDisposableServiceInterface>(_logger,() => disposableService, "IDummyDisposableServiceInterface");

            // Act
            hubServiceHost.GetService(DummyConnectionId);
            hubServiceHost.DisposeService(DummyConnectionId);

            // Assert
            A.CallTo(() => disposableService.Dispose()).MustHaveHappened(Repeated.Exactly.Once);
        }


        [Test]
        public void DisposeService_DisposableServiceWithException_CallsDisposeOnService()
        {
            Setup();
            // Arrange
            var disposableService = A.Fake<IDummyDisposableServiceInterface>();
            A.CallTo(() => disposableService.Dispose()).Throws(new Exception());
            var hubServiceHost = new HubServiceHost<IDummyDisposableServiceInterface>(_logger, () => disposableService, "IDummyDisposableServiceInterface");

            // Act
            hubServiceHost.GetService(DummyConnectionId);
            hubServiceHost.DisposeService(DummyConnectionId);

            // Assert
            A.CallTo(() => disposableService.Dispose()).MustHaveHappened(Repeated.Exactly.Once);
        }

        [Test]
        public void DisposeService_DisposeServiceCallbackSpecified_CallbackCalled()
        {
            Setup();
            // Arrange
            var endServiceCount = 0;
            var service = A.Fake<IDummyServiceInterface>();
            var hubServiceHost = new HubServiceHost<IDummyServiceInterface>(_logger, () => service, "IDummyServiceInterface");

            // Act
            hubServiceHost.GetService(DummyConnectionId, null, s => { endServiceCount++; });
            hubServiceHost.DisposeService(DummyConnectionId);

            // Assert
            Assert.AreEqual(1, endServiceCount);
        }

        [Test]
        public void DisposeService_NoServiceInstanceCreated_DoesNotCallDispose()
        {
	        Setup();
            // Arrange
            var disposableService = A.Fake<IDummyDisposableServiceInterface>();
            var hubServiceHost = new HubServiceHost<IDummyDisposableServiceInterface>(_logger, () => disposableService, "IDummyDisposableServiceInterface");

            // Act
            hubServiceHost.DisposeService(DummyConnectionId);

            // Assert
            A.CallTo(() => disposableService.Dispose()).MustNotHaveHappened();
        }

        [Test]
        public void GetService_FirstTimeCalled_ReturnsNewService()
        {
            Setup();
            // Arrange
            var serviceCreationCalls = 0;
            var fakeService = A.Fake<IDummyServiceInterface>();
            var hubServiceHost = new HubServiceHost<IDummyServiceInterface>(
                _logger, () =>
                {
                    serviceCreationCalls++;
                    return fakeService;
                },
                "IDummyServiceInterface");

            // Act
            var service = hubServiceHost.GetService(DummyConnectionId);

            // Assert
            Assert.AreSame(fakeService, service);
            Assert.AreEqual(1, serviceCreationCalls);

            hubServiceHost.DisposeService(DummyConnectionId);
        }

        [Test]
        public void GetService_NewActionSpecifiedCalledOnce_CallsNewActionOnce()
        {
            Setup();
            // Arrange
            var serviceCreationCalls = 0;
            var newServiceCallbacks = 0;
            var fakeService = A.Fake<IDummyServiceInterface>();
            var hubServiceHost = new HubServiceHost<IDummyServiceInterface>(
               _logger, () =>
                {
                    serviceCreationCalls++;
                    return fakeService;
                },
                "IDummyServiceInterface");

            // Act
            var service = hubServiceHost.GetService(DummyConnectionId, s => { newServiceCallbacks++; });

            // Assert
            Assert.AreSame(fakeService, service);
            Assert.AreEqual(1, serviceCreationCalls);
            Assert.AreEqual(1, newServiceCallbacks);

            hubServiceHost.DisposeService(DummyConnectionId);
        }

        [Test]
        public void GetService_NewActionSpecifiedCalledTwice_CallsNewActionOnce()
        {
            Setup();
            // Arrange
            var serviceCreationCalls = 0;
            var newServiceCallbacks = 0;
            var fakeService = A.Fake<IDummyServiceInterface>();
            var hubServiceHost = new HubServiceHost<IDummyServiceInterface>(
                _logger, () =>
                {
                    serviceCreationCalls++;
                    return fakeService;
                },
                "IDummyServiceInterface");

            // Act
            hubServiceHost.GetService(DummyConnectionId, s => { newServiceCallbacks++; });
            var service = hubServiceHost.GetService(DummyConnectionId, s => { newServiceCallbacks++; });

            // Assert
            Assert.IsTrue(fakeService == service);
            Assert.AreEqual(1, serviceCreationCalls);
            Assert.AreEqual(1, newServiceCallbacks);

            hubServiceHost.DisposeService(DummyConnectionId);
        }

        [Test]
        public void GetService_SecondTimeCalled_ReturnsOriginalInstance()
        {
            Setup();
            // Arrange
            var serviceCreationCalls = 0;
            var fakeService = A.Fake<IDummyServiceInterface>();
            var hubServiceHost = new HubServiceHost<IDummyServiceInterface>(
                _logger, () =>
                {
                    serviceCreationCalls++;
                    return fakeService;
                },
                "IDummyServiceInterface");

            // Act
            hubServiceHost.GetService(DummyConnectionId);
            var service = hubServiceHost.GetService(DummyConnectionId);

            // Assert
            Assert.IsTrue(fakeService == service);
            Assert.AreEqual(1, serviceCreationCalls);

            hubServiceHost.DisposeService(DummyConnectionId);
        }
    }

    public interface IDummyServiceInterface
    {
    }

    public interface IDummyDisposableServiceInterface : IDisposable
    {

    }
}