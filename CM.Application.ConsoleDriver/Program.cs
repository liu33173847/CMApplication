namespace CM.Application.ConsoleDriver
{
    using System;
    using CM.Application.Common;
    using CM.Application.Core;

    class Program
    {
        static void Main(string[] args)
        {
            var coreApp = new Application();

            Console.WriteLine("------------- Requirement 1 -------------");
            string rq1Sample1 = null;
            string rq1Sample2 = "a";
            string rq1Sample3 = "";
            string rq1Sample4 = "null";

            Console.WriteLine(rq1Sample1.IsNullOrEmpty());
            Console.WriteLine(rq1Sample2.IsNullOrEmpty());
            Console.WriteLine(rq1Sample3.IsNullOrEmpty());
            Console.WriteLine(rq1Sample4.IsNullOrEmpty());

            Console.WriteLine("------------- Requirement 2 -------------");
            int rq2Sample1 = 60;
            int rq2Sample2 = 42;

            Console.WriteLine(string.Join(", ", coreApp.GetDivisorsForNumber(rq2Sample1)));
            Console.WriteLine(string.Join(", ", coreApp.GetDivisorsForNumber(rq2Sample2)));

            Console.WriteLine("------------- Requirement 3 -------------");
            var rq3Sample1 = new[] { 5, 4, 3};
            var rq3Sample2 = new[] { 1, 2, -3};
            var rq3Sample3 = new[] { 1, 2, 3};

            try
            {
                Console.WriteLine(coreApp.CalculateTriangleArea(rq3Sample1[0], rq3Sample1[1], rq3Sample1[2]));
            }
            catch (InvalidTriangleException ex)
            {
                Console.WriteLine("Invalid triangle sides, Exception:" + ex.Message);
            }
            try
            {
                Console.WriteLine(coreApp.CalculateTriangleArea(rq3Sample2[0], rq3Sample2[1], rq3Sample2[2]));
            }
            catch (InvalidTriangleException ex)
            {
                Console.WriteLine("Invalid triangle sides, Exception:" + ex.Message);
            }
            try
            {
                Console.WriteLine(coreApp.CalculateTriangleArea(rq3Sample3[0], rq3Sample3[1], rq3Sample3[2]));
            }
            catch (InvalidTriangleException ex)
            {
                Console.WriteLine("Invalid triangle sides, Exception:" + ex.Message);
            }
                      
            Console.WriteLine("------------- Requirement 4 -------------");
            var rq4Sample1 = new[] {5, 4, 3, 2, 4, 5, 1, 6, 1, 2, 5, 4};
            var rq4Sample2 = new[] {1, 2, 3, 4, 5, 1, 6, 7};
            var rq4Sample3 = new[] {1, 2, 3, 4, 5, 6, 7};

            Console.WriteLine(string.Join(", ", coreApp.FindMostCommonNumbers(rq4Sample1)));
            Console.WriteLine(string.Join(", ", coreApp.FindMostCommonNumbers(rq4Sample2)));
            Console.WriteLine(string.Join(", ", coreApp.FindMostCommonNumbers(rq4Sample3)));

            Console.ReadLine();
        }
    }
}
