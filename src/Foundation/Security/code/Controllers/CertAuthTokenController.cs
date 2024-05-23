using System.Linq;
using System.Security.Claims;
using System.Web.Http;
using Pmi.Anc.Certification.Foundation.Security.CertCors.Attributes;

namespace Pmi.Anc.Certification.Foundation.Security.Controllers
{
    [AllowCertCors]
    public class CertAuthTokenController : ApiController
    {
        public const string AccessToken = "access_token";

        [HttpGet]
        public virtual IHttpActionResult Index()
        {
            var identity = User?.Identity as ClaimsIdentity;
            return this.Json(identity?.Claims?.FirstOrDefault(_ => _.Type == AccessToken)?.Value);
        }
    }
}
