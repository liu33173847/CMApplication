namespace CM.Application.Common
{
    using System;

    public interface ILogger
    {
        void LogMessage(string methodName, string msg, params object[] args);

        void LogMessage(string methodName, Func<string> messageFormatter);

        void LogError(string methodName, string msg, params object[] args);

        void LogException(string context, Exception ex);
    }
}
