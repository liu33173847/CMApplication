namespace CM.Application.SingalRHubs.CoreApplication
{
    using System.Collections.Generic;
    using CM.Application.SingalRHubs.CoreApplication.SignalRService;
    using CM.Application.Core;

    public class CoreApplication : ICoreApplication
    {
        private readonly IApplication _application;

        public CoreApplication(IApplication application)
        {
            _application = application;
        }

        public IEnumerable<int> GetDivisorsForNumber(int number)
        {
            return _application.GetDivisorsForNumber(number);
        }

        public double CalculateTriangleArea(double sideA, double sideB, double sideC)
        {
            return _application.CalculateTriangleArea(sideA, sideB, sideC);
        }

        public IEnumerable<int> FindMostCommonNumbers(IEnumerable<int> numbers)
        {
            return _application.FindMostCommonNumbers(numbers);
        }
    }
}
