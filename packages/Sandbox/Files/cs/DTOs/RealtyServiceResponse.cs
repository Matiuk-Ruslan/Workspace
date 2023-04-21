using System.Runtime.Serialization;

namespace Sandbox.cs.DTOs
{
    [DataContract]
    public class RealtyServiceResponse
    {
        [DataMember(Name = "success", Order = 0)]
        public string Success { get; set; }

        [DataMember(Name = "totalPrice", Order = 1)]
        public decimal? TotalPrice { get; set; }

        [DataMember(Name = "error", Order = 2)]
        public string Error { get; set; }
    }
}