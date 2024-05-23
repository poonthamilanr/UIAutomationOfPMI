using Microsoft.Extensions.DependencyInjection;
using Pmi.Anc.Certification.Foundation.Security.CertCors.Settings;
using Pmi.Anc.Certification.Foundation.Security.Settings;
using Sitecore.DependencyInjection;

namespace Pmi.Anc.Certification.Foundation.Security
{
    public class ServicesConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection services)
        {
            services.AddScoped<ICertCorsSettings, CertCorsSettings>();
            services.AddSingleton<ISecuritySettings, SecuritySettings>();
        }
    }
}