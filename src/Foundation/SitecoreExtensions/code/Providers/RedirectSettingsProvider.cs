using Pmi.Anc.Certification.Foundation.SitecoreExtensions.Extensions;
using Pmi.Anc.Certification.Foundation.SitecoreExtensions.Settings;
using Sitecore.Data;
using System.Collections.Generic;

namespace Pmi.Anc.Certification.Foundation.SitecoreExtensions.Providers
{
    public class RedirectSettingsProvider : IRedirectSettingsProvider
    {
        private const string RedirectLinkTemplateId = "{B9C25D9F-F3DD-462D-A47F-A0DBBB7532F7}";

        public RedirectSettings GetRedirectSettings()
        {
            var redirectSettings = new RedirectSettings();
            var redirectLinks = new Dictionary<string, string>();

            var rootPath = Sitecore.Context.Site.RootPath;
            var rootItem = Sitecore.Context.Database.GetItem(rootPath);

            var redirectLinkItems = rootItem.GetDescendantsOfTemplate(new ID(RedirectLinkTemplateId));

            foreach (var redirectLinkItem in redirectLinkItems)
            {
                if(!string.IsNullOrWhiteSpace(redirectLinkItem[RedirectLink.PurposeFieldId]))
                {
                    redirectLinks.Add(redirectLinkItem[RedirectLink.PurposeFieldId], redirectLinkItem[RedirectLink.LinkFieldId]);
                }
            }

            redirectSettings.RedirectLinks = redirectLinks;

            return redirectSettings;
        }
    }
}