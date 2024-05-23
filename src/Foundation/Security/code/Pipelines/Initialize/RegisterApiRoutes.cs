using System.Web.Http;
using Sitecore.Pipelines;

namespace Pmi.Anc.Certification.Foundation.Security.Pipelines.Initialize
{
    public class RegisterApiRoutes
    {
        public virtual void Process(PipelineArgs args)
        {
            WebApiConfig.Register(GlobalConfiguration.Configuration);
        }
    }
}