namespace CM.Application.Core.Models
{
    internal abstract class Shape
    {
        internal double Area { get; set; }

        protected Shape()
        {
            Area = 0;
        }

        public abstract void CalculateArea();
    }
}
