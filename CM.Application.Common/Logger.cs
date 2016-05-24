// this is a dummy logger, need to be rewrote using Microsoft.Practices.EnterpriseLibrary.Logging
namespace CM.Application.Common
{
    using System;
    public class Logger : ILogger
    {
        public void LogError(string methodName, string msg, params object[] args)
        {
            Console.WriteLine(msg);
        }

        public void LogException(string context, Exception ex)
        {
            Console.WriteLine(context);
        }

        public void LogMessage(string methodName, Func<string> messageFormatter)
        {
            Console.WriteLine(methodName);
        }

        public void LogMessage(string methodName, string msg, params object[] args)
        {
            Console.WriteLine(msg);
        }
    }
}
