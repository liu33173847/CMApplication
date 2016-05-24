using System;
using System.Collections.Generic;

namespace CM.Application.Core
{
    public interface IApplication
    {        
        IEnumerable<int> GetDivisorsForNumber(int number);

        double CalculateTriangleArea(double sideA, double sideB, double sideC);

        IEnumerable<int> FindMostCommonNumbers(IEnumerable<int> numbers);
    }
}
