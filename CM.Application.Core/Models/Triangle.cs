namespace CM.Application.Core.Models
{
    using System;
    using CM.Application.Common;

    internal class Triangle : Shape
    {
        private double _sideA;
        private double _sideB;
        private double _sideC;

        public Triangle(double sideA, double sideB, double sideC)            
        {
            _sideA = sideA;
            _sideB = sideB;
            _sideC = sideC;
        }

        private void Validate()
        {
            if (_sideA <= 0 || _sideB <= 0 || _sideC <= 0)
            {
                throw new InvalidTriangleException("One or more sides have negative value.");
            }

            if ((_sideA + _sideB) <= _sideC || (_sideA + _sideC) <= _sideB || (_sideB + _sideC) <= _sideA)
            {
                throw new InvalidTriangleException("Sides can not form a valid triangle.");
            }
        }

        public override void CalculateArea()
        {
            Validate();

            double d = (_sideA + _sideB + _sideC)/2.0;
            Area = Math.Sqrt(d*(d - _sideA)*(d - _sideB)*(d - _sideC));

            if (double.IsNaN(Area))
            {
                throw new InvalidTriangleException("Sides can not form a valid triangle.");
            }
        }
    }
}
