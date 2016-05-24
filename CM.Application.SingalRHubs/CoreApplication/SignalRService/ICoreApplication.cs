namespace CM.Application.SingalRHubs.CoreApplication.SignalRService
{
    using System;
    using System.Collections.Generic;

    public interface ICoreApplication
    {
        IEnumerable<int> GetDivisorsForNumber(int number);

        double CalculateTriangleArea(double sideA, double sideB, double sideC);

        IEnumerable<int> FindMostCommonNumbers(IEnumerable<int> numbers);    
    }
}
