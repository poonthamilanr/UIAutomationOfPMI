using Sitecore.Abstractions;
using Sitecore.Pipelines.GetSignInUrlInfo;
using System.Web.Mvc;
using SC = Sitecore;
using System.Web;

namespace Pmi.Anc.Certification.Foundation.Security.Controllers
{
    public class IdentityRedirectController : Controller
    {
        private  const string RETURN_TOKEN = "returnToken";
        // GET: IdentityRedirect
        public ActionResult Index()
        {
            var returnUrl = Request.QueryString["returnUrl"];
            if (!string.IsNullOrEmpty(returnUrl))
            {
                returnUrl = HttpUtility.UrlEncode(HttpUtility.UrlEncode(returnUrl));
            }
            var url = GetAuthenticationUrl();
            url = url.Replace(RETURN_TOKEN, returnUrl);
            return Content($"<html><body><form id='idpForm' action='{url}' method='post'></form><script>document.getElementById('idpForm').submit();</script></body></html>");
        }

        private string GetAuthenticationUrl()
        {
            BaseCorePipelineManager corePipelineManager = (BaseCorePipelineManager)SC.DependencyInjection.ServiceLocator.ServiceProvider.GetService(typeof(BaseCorePipelineManager));
            var signInUrlInfoArgs = new GetSignInUrlInfoArgs("website", RETURN_TOKEN);
            GetSignInUrlInfoPipeline.Run(corePipelineManager, signInUrlInfoArgs);
            var signInUrlInfo = signInUrlInfoArgs.Result[0];
            return signInUrlInfo?.Href;
        }
    }
}
