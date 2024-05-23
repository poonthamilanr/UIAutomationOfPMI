using Microsoft.Extensions.DependencyInjection;
using Pmi.Anc.Certification.Foundation.Navigation.Controllers;
using Pmi.Anc.Certification.Foundation.Navigation.Services;
using Sitecore.DependencyInjection;

namespace Pmi.Anc.Certification.Foundation.Navigation
{
    public class ServicesConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection services)
        {
            services.AddTransient<INavigationService, NavigationService>();
            services.AddTransient<CertNavigationController>();
        }
    }
}