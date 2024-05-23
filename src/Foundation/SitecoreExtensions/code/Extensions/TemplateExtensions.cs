using Sitecore.Data;
using Sitecore.Data.Managers;
using Sitecore.Data.Templates;
using System.Linq;

namespace Pmi.Anc.Certification.Foundation.SitecoreExtensions.Extensions
{
    public static class TemplateExtensions
    {
        public static ID StandardTemplateId = ID.Parse("{1930BBEB-7805-471A-A3BE-4858AC7CF696}");

        public static bool InheritsFrom(this Template template, ID inheritedId, Database database)
        {
            if (template == null || database == null)
            {
                return false;
            }

            if (template.ID == inheritedId)
            {
                return true;
            }

            var hasBaseTemplate = template.BaseIDs.Any(baseId => baseId == inheritedId);

            if (hasBaseTemplate)
            {
                return true;
            }

            var baseTemplates = template.BaseIDs
                                        .Where(baseId => baseId != TemplateExtensions.StandardTemplateId)
                                        .Select(baseId => TemplateManager.GetTemplate(baseId, database));

            return baseTemplates.Any(baseTemplate => baseTemplate != null && baseTemplate.InheritsFrom(inheritedId, database));
        }
    }
}