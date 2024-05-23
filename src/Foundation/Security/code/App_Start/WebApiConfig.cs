using System.Web.Http;

namespace Pmi.Anc.Certification.Foundation.Security
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "CertAuthToken",
                "api/cert-app-auth-token/{action}",
                new
                {
                    controller = "CertAuthToken"
                });
        }
    }
}
