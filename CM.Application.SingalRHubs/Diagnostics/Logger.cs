namespace CM.Application.SingalRHubs.Diagnostics
{
    using System;
    using System.Linq;
    using System.Runtime.CompilerServices;
    using CM.Application.Common;

    internal static class Logger
    {
        private static ILogger _logger;

        public static ILogger Instance
        {
            get { return _logger; }
        }

        public static ILogger SetLoggerInstance(ILogger logger)
        {
            var retLogger = _logger;
            _logger = logger;
            return retLogger;
        }

        public static void LogParam(string message = "", [CallerFilePath] string file = "",
                                    [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("", message, file, member, line);
        }

        public static void LogParam(Func<string> formatStringFunction, [CallerFilePath] string file = "",
                                    [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("", formatStringFunction, file, member, line);
        }

        public static void LogMessage(string message, [CallerFilePath] string file = "", [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal(string.Empty, message, file, member, line);
        }

        public static void LogMessage(Func<string> formatStringFunction, [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal(string.Empty, formatStringFunction, file, member, line);
        }

        public static void LogTrace(string message, [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal(string.Empty, message, file, member, line);
        }

        public static void LogTrace(Func<string> formatStringFunction, [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal(string.Empty, formatStringFunction, file, member, line);
        }

        public static void LogError(string message, [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("Error", message, file, member, line);
        }

        public static void LogError(Func<string> formatStringFunction, [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("Error", formatStringFunction, file, member, line);
        }

        public static void LogException(string message, Exception e, [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("Error", message + e, file, member, line);
        }

        public static void LogEntry(string message = "", [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("Entry", message, file, member, line);
        }

        public static void LogEntry(Func<string> formatStringFunction, [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("Entry", formatStringFunction, file, member, line);
        }

        public static void LogExit(string message = "", [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("Exit", message, file, member, line);
        }

        public static void LogExit(Func<string> formatStringFunction, [CallerFilePath] string file = "",
            [CallerMemberName] string member = "", [CallerLineNumber] int line = 0)
        {
            LogInternal("Exit", formatStringFunction, file, member, line);
        }

        private static void LogInternal(string context, string message, string file, string member, int line)
        {
            _logger.LogMessage(FormatContext(file, member, line, context), message);
        }

        private static void LogInternal(string context, Func<string> formatStringFunction,
            string file, string member, int line)
        {
            _logger.LogMessage(FormatContext(file, member, line, context), formatStringFunction);
        }

        private static string FormatContext(string file, string member, int line, string context)
        {
            var fileName = file.Split("\\".ToCharArray()).Last();

            return $"{fileName}:{line}: {member}:{context}";
        }
    }
}
