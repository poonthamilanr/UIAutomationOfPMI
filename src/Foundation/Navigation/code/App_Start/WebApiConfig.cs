using System.Web.Http;

namespace Pmi.Anc.Certification.Foundation.Navigation
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "CertNavigation",
                "api/cert-navigation/{action}",
                new
                {
                    controller = "CertNavigation"
                });
        }
    }
}
