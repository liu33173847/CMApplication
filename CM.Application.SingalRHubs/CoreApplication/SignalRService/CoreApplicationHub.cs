namespace CM.Application.SingalRHubs.CoreApplication.SignalRService
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using CM.Application.SignalRHost;

    public class CoreApplicationHub : ServiceHub<ICoreApplication>, ICoreApplicationHub
    {
        public CoreApplicationHub(IHubServiceHost<ICoreApplication> hubServiceHost) : base(hubServiceHost, Diagnostics.Logger.Instance)
        {
            Diagnostics.Logger.LogEntry("CoreApplicationHub Instantiated");
        }

        protected override ICoreApplication Service => GetService(Context.ConnectionId);

        public IEnumerable<int> GetDivisorsForNumber(int number)
        {
            Diagnostics.Logger.LogEntry(() => $"Number: {number}");
            var divisors = new int[0];

            try
            {
                divisors = Service.GetDivisorsForNumber(number).ToArray();
            }
            catch (Exception ex)
            {
                Diagnostics.Logger.LogException("Error occurered:", ex);
                Client.onRequestFailed(ex.Message);
            }
            Diagnostics.Logger.LogExit();
            return divisors;
        }

        public double CalculateTriangleArea(double sideA, double sideB, double sideC)
        {
            Diagnostics.Logger.LogEntry(() => $"Sides: {sideA},{sideB},{sideC}");
            double area = 0;

            try
            {
                area = Service.CalculateTriangleArea(sideA,sideB,sideC);
            }
            catch (Exception ex)
            {
                Diagnostics.Logger.LogException("Error occurered:", ex);
                Client.onRequestFailed(ex.Message);
            }
            Diagnostics.Logger.LogExit();
            return area;
        }

        public IEnumerable<int> FindMostCommonNumbers(IEnumerable<int> numbers)
        {
            Diagnostics.Logger.LogEntry(() => $"Numbers: {numbers}");
            var mostCommonNumbers = new int[0];

            try
            {
                mostCommonNumbers = Service.FindMostCommonNumbers(numbers).ToArray();
            }
            catch (Exception ex)
            {
                Diagnostics.Logger.LogException("Error occurered:", ex);
                Client.onRequestFailed(ex.Message);
            }
            Diagnostics.Logger.LogExit();
            return mostCommonNumbers;
        }
    }
}
