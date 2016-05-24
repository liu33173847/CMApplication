namespace CM.Application.Core.Tests
{
    using NUnit.Framework;
    using System.Collections.Generic;
    using FluentAssertions;
    using CM.Application.Common;

    [TestFixture]
    public class ApplicationTests
    {

        [TestCase(null, true)]
        [TestCase("a", false)]
        [TestCase("", true)]
        [TestCase("null", false)]
        public void StringIsNullOrEmpty_ValidInput_ReturnsCorrectResult(string input, bool expectedResult)
        {
            // Arrange
            var application = new Application();

            // Act
            var result = input.IsNullOrEmpty();

            // Assert
            result.Should().Be(expectedResult);
        }

        [TestCase(0)]
        [TestCase(-1)]
        public void GetDivisorsForNumber_InvalidInput_ReturnsEmptyArray(int number)
        {
            // Arrange
            var application = new Application();

            // Act
            var result = application.GetDivisorsForNumber(number);

            // Assert
            result.Should().BeEmpty();
        }
                      
        [TestCase(1, new[] { 1 })]
        [TestCase(42, new[] { 1, 2, 3, 6, 7, 14, 21, 42 })]
        [TestCase(60, new[] { 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60 })]
        [TestCase(128, new[] { 1, 2, 4, 8, 16, 32, 64, 128 })]
        public void GetDivisorsForNumber_ValidInput_ReturnsCorrectResult(int input,IEnumerable<int> expectedResult)
        {
            // Arrange
            var application = new Application();

            // Act
            var result = application.GetDivisorsForNumber(input);

            // Assert
            result.Should().Equal(expectedResult);
        }

        [TestCase(-1, 1, 2)]
        [TestCase(1, -1, 2)]
        [TestCase(1, 1, -1)]
        [TestCase(1, -1, -1)]
        [TestCase(-1, -1, 1)]
        [TestCase(-1, 1, -1)]
        [TestCase(-1, -1, -1)]
        [TestCase(0, 1, 2)]
        [TestCase(1, 2, 3)]
        public void CalculateTriangleArea_InvalidInput_ThrowException(double sideA, double sideB, double sideC)
        {
            // Arrange
            var application = new Application();

            // Act

            // Assert
            Assert.Throws<InvalidTriangleException>(() => application.CalculateTriangleArea(sideA, sideB, sideC));
        }

        [TestCase(3, 4, 5, 6)]
        [TestCase(10, 10, 19, 29.6637404923924)]
        [TestCase(15, 25, 35, 162.379763209582)]
        public void CalculateTriangleArea_ValidInput_ReturnCorrectArea(double sideA, double sideB, double sideC, double expectedArea)
        {
            // Arrange
            var application = new Application();

            // Act
            var result = application.CalculateTriangleArea(sideA, sideB, sideC);
            
            // Assert
            result.Should().BeApproximately(expectedArea, 0.000000000001);
        }


        [TestCase(new int[0])]
        [TestCase(null)]
        public void FindMostCommonNumbers_InvalidInput_ReturnsEmptyArray(IEnumerable<int> numbers)
        {
            // Arrange
            var application = new Application();

            // Act
            var result = application.FindMostCommonNumbers(numbers);

            // Assert
            result.Should().BeEmpty();
        }

        [TestCase(new [] { 5, 4, 3, 2, 4, 5, 1, 6, 1, 2, 5, 4 }, new [] { 5, 4 }, "Test 1")]
        [TestCase(new [] { 1, 2, 3, 4, 5, 1, 6, 7 }, new [] { 1 }, "Test 2")]
        [TestCase(new [] { 1, 2, 3, 4, 5, 6, 7 }, new [] { 1, 2, 3, 4, 5, 6, 7 }, "Test 3")]
        public void FindMostCommonNumbers_ValidInput_ReturnsCorrectResult(IEnumerable<int> numbers, IEnumerable<int> expectedResult, string testName)
        {
            // Arrange
            var application = new Application();

            // Act
            var result = application.FindMostCommonNumbers(numbers);

            // Assert
            result.Should().Equal(expectedResult);
        }

    }
}
