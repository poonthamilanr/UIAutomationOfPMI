using Microsoft.Extensions.DependencyInjection;
using Pmi.Anc.Certification.Foundation.Security.CertCors.Settings;
using Sitecore.DependencyInjection;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace Pmi.Anc.Certification.Foundation.Security.CertCors.Attributes
{
    public class AllowCertCorsAttribute :Attribute, ICorsPolicyProvider
    {
        private ICertCorsSettings _certCorsSettings;

        public AllowCertCorsAttribute() : this(ServiceLocator.ServiceProvider.GetService<ICertCorsSettings>())
        {
        }

        public AllowCertCorsAttribute(ICertCorsSettings certCorsSettings)
        {
            _certCorsSettings = certCorsSettings;
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var policy = new CorsPolicy
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true,
                AllowAnyOrigin = false,
                SupportsCredentials = true,
            };

            if (_certCorsSettings.Origins != null)
            {
                foreach(var origin in _certCorsSettings.Origins)
                {
                    policy.Origins.Add(origin);
                }
            }

            return Task.FromResult(policy);
        }
    }
}