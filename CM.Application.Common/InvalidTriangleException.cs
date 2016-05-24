namespace CM.Application.Common
{
    using System;
    using System.Runtime.Serialization;

    public class InvalidTriangleException : Exception
    {
        public InvalidTriangleException()
        {
        }

        public InvalidTriangleException(string message) 
            : base(message)
        {
        }

        public InvalidTriangleException(string message, Exception inner) 
            : base(message, inner)
        {
        }

        // This constructor is needed for serialization.
        protected InvalidTriangleException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
