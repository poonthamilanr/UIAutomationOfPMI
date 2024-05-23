using Microsoft.Extensions.DependencyInjection;
using Pmi.Anc.Certification.Foundation.SitecoreExtensions.Providers;
using Sitecore.DependencyInjection;

namespace Pmi.Anc.Certification.Foundation.SitecoreExtensions
{
    public class ServicesConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection services)
        {
            services.AddTransient<IRedirectSettingsProvider, RedirectSettingsProvider>();
            services.AddTransient<IConfigSettingsProvider, ConfigSettingsProvider>();
        }
    }
}