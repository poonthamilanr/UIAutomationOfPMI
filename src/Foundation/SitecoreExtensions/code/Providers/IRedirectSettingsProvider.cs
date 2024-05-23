using Pmi.Anc.Certification.Foundation.SitecoreExtensions.Settings;

namespace Pmi.Anc.Certification.Foundation.SitecoreExtensions.Providers
{
    public interface IRedirectSettingsProvider
    {
        RedirectSettings GetRedirectSettings();
    }
}
