using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Pmi.Anc.Certification.Foundation.Navigation.Services;
using Pmi.Anc.Certification.Foundation.Security.CertCors.Attributes;

namespace Pmi.Anc.Certification.Foundation.Navigation.Controllers
{
    [AllowCertCors]
    public class CertNavigationController : ApiController
    {
        private readonly INavigationService _navigationService;


        public CertNavigationController(INavigationService navigationService)
        {
            _navigationService = navigationService;
        }

        [HttpGet]
        [ActionName("account-menu-items")]
        public virtual IHttpActionResult GetAccountMenuItems([FromUri] string returnUrl)
        {
            return Json(_navigationService.GetAccountMenuItems(returnUrl), new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
}
