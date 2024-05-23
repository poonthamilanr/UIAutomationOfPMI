using Pmi.Anc.Certification.Foundation.SitecoreExtensions.Providers;
using Sitecore.JavaScriptServices.Configuration;
using Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;

namespace Pmi.Anc.Certification.Foundation.SitecoreExtensions.Pipelines.GetLayoutServiceContext
{
    public class RedirectsContextExtension : JssGetLayoutServiceContextProcessor
    {
        protected IRedirectSettingsProvider redirectSettingsProvider;

        public RedirectsContextExtension(IRedirectSettingsProvider redirectSettingsProvider, IConfigurationResolver configurationResolver) : base(configurationResolver)
        {
            this.redirectSettingsProvider = redirectSettingsProvider;
        }

        protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
        {
            var redirectSettings = this.redirectSettingsProvider.GetRedirectSettings();

            args.ContextData.Add("appRedirects", new
            {
                rootPath = Sitecore.Context.Site.RootPath,
                redirectLinks = redirectSettings.RedirectLinks
            });
        }
    }
}