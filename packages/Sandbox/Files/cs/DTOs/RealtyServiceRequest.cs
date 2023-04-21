using System.Runtime.Serialization;

namespace Sandbox.cs.DTOs
{
    [DataContract]
    public class RealtyServiceRequest
    {
        [DataMember(Name = "realtyType")]
        public string RealtyType { get; set; }

        [DataMember(Name = "offerType")]
        public string OfferType { get; set; }
    }
}