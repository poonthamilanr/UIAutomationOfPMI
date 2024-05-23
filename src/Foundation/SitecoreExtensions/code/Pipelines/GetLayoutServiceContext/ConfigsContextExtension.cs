using Pmi.Anc.Certification.Foundation.SitecoreExtensions.Providers;
using Sitecore.JavaScriptServices.Configuration;
using Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;

namespace Pmi.Anc.Certification.Foundation.SitecoreExtensions.Pipelines.GetLayoutServiceContext
{
    public class ConfigsContextExtension : JssGetLayoutServiceContextProcessor
    {
        protected IConfigSettingsProvider configSettingsProvider;

        public ConfigsContextExtension(IConfigSettingsProvider configSettingsProvider, IConfigurationResolver configurationResolver) : base(configurationResolver)
        {
            this.configSettingsProvider = configSettingsProvider;
        }

        protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
        {
            var configSettings = this.configSettingsProvider.GetConfigSettings();

            args.ContextData.Add("configSettings", new
            {
                rootPath = Sitecore.Context.Site.RootPath,
                configs = configSettings.Configs
            });
        }
    }
}