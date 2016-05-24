namespace CM.Application.Core
{
    using System;
    using CM.Application.Core.Models;
    using System.Collections.Generic;
    using System.Linq;

    public class Application : IApplication
    {
        public IEnumerable<int> GetDivisorsForNumber(int number)
        {
            if (number < 0) return new int[0];

            return from factor in Enumerable.Range(1, number)
                   where number % factor == 0
                   select factor;
        }

        public double CalculateTriangleArea(double sideA, double sideB, double sideC)
        {
            var triAngle = new Triangle(sideA,sideB,sideC);
            triAngle.CalculateArea();

            return triAngle.Area;
        }

        public IEnumerable<int> FindMostCommonNumbers(IEnumerable<int> numbers)
        {
            if (numbers == null || !numbers.Any()) return new int[0];

            var sortedGroupedNumbers = numbers.GroupBy(number => number).OrderByDescending(group => group.Count());
            int maxFrequency = sortedGroupedNumbers.First().Count();
            return
                sortedGroupedNumbers.Where(groupedNumber => groupedNumber.Count() == maxFrequency)
                    .Select(groupedNumber => groupedNumber.Key)                    
                    .ToArray();
        }
    }
}
