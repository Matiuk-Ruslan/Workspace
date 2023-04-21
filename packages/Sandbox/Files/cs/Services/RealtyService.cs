using System;
using System.Net;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core.DB;
using Terrasoft.Web.Common;
using Sandbox.cs.DTOs;

namespace Sandbox.cs.Services
{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class RealtyService : BaseService
    {
        #region Fields

        private RealtyServiceResponse response;

        #endregion

        #region Methods

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, ResponseFormat = WebMessageFormat.Json)]
        public RealtyServiceResponse GetTotalPrice(RealtyServiceRequest request)
        {
            response = new RealtyServiceResponse { Success = "-1" };

            #region Validator: IsNullOrEmpty

            if (string.IsNullOrEmpty(request.RealtyType)|| string.IsNullOrEmpty(request.OfferType))
            {
                response.Success = "-1";
                response.TotalPrice = null;
                response.Error = "Отсутствуют обязательные значения параметров.";

                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }

            #endregion

            #region Validator: Guid

            Guid realtyTypeId;
            Guid offerTypeId;

            try
            {
                realtyTypeId = new Guid(request.RealtyType);
                offerTypeId = new Guid(request.OfferType);
            }
            catch (Exception ex)
            {
                Logger.WriteToLog("RealtyService.GetTotalPrice.Ex", $"RealtyType: {request.RealtyType}, OfferType: {request.OfferType}, Exception: {ex.Message}", UserConnection);

                response.Success = "-1";
                response.TotalPrice = null;
                response.Error = ex.Message;

                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }
            

            #endregion

            #region Validator: Guid.Empty

            if (realtyTypeId == Guid.Empty || offerTypeId == Guid.Empty)
            {
                response.Success = "-1";
                response.TotalPrice = null;
                response.Error = "Параметры не могут быть равны Guid.Empty.";

                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }

            #endregion

            try
            {
                Select select = new Select(UserConnection)
                    .Column(Func.Sum("Price"))
                    .From("Realty")
                    .Where("RealtyTypeId").IsEqual(Column.Parameter(realtyTypeId))
                    .And("OfferTypeId").IsEqual(Column.Parameter(offerTypeId)) as Select;
                decimal totalPrice = select.ExecuteScalar<decimal>();

                response.Success = null;
                response.TotalPrice = totalPrice;
                response.Error = null;

                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.OK;
                return response;
            }
            catch (Exception ex)
            {
                Logger.WriteToLog("RealtyService.GetTotalPrice.Ex", $"RealtyType: {request.RealtyType}, OfferType: {request.OfferType}, Exception: {ex.Message}", UserConnection);
                
                response.Success = "-1";
                response.TotalPrice = null;
                response.Error = ex.Message;
                
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.InternalServerError;
                return response;
            }
        }

        #endregion
    }
}