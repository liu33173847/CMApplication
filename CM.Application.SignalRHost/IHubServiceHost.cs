// **************************************************************************
// Copyright 2014 Honeywell International Sàrl
// **************************************************************************
namespace CM.Application.SignalRHost
{
    using System;

    public interface IHubServiceHost<out T> where T : class
    {
        void DisposeService(string connectionId);

        T GetService(string connectionId);

        T GetService(string connectionId, Action<T> newServiceAction);

        T GetService(string connectionId, Action<T> newServiceAction, Action<T> serviceDisposingAction);
    }
}