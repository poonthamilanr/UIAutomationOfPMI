using Pmi.Anc.Certification.Foundation.SitecoreExtensions.Extensions;
using Pmi.Anc.Certification.Foundation.SitecoreExtensions.Settings;
using Sitecore.Data;
using System.Collections.Generic;

namespace Pmi.Anc.Certification.Foundation.SitecoreExtensions.Providers
{
    public class ConfigSettingsProvider : IConfigSettingsProvider
    {
        private const string RedirectLinkTemplateId = "{BE31BB5E-4987-4A00-8113-E6CC63810E21}";

        public ConfigSettings GetConfigSettings()
        {
            var configSettings = new ConfigSettings();
            var configs = new Dictionary<string, string>();

            var rootPath = Sitecore.Context.Site.RootPath;
            var rootItem = Sitecore.Context.Database.GetItem(rootPath);

            var configItems = rootItem.GetDescendantsOfTemplate(new ID(RedirectLinkTemplateId));

            foreach (var configItem in configItems)
            {
                if(!string.IsNullOrWhiteSpace(configItem[SitecoreConfig.NameFieldId]))
                {
                    configs.Add(configItem[SitecoreConfig.NameFieldId], configItem[SitecoreConfig.ValueFieldId]);
                }
            }

            configSettings.Configs = configs;

            return configSettings;
        }
    }
}