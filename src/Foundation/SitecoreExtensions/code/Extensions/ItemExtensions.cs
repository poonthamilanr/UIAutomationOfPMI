using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Data.Managers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Pmi.Anc.Certification.Foundation.SitecoreExtensions.Extensions
{
    public static class ItemExtensions
    {
        public static bool IsDerived(this Item item, Item inheritedTemplateItem)
        {
            if (item == null
                || inheritedTemplateItem == null)
            {
                return false;
            }

            var itemTemplate = TemplateManager.GetTemplate(item);

            return itemTemplate != null && (itemTemplate.ID == inheritedTemplateItem.ID || itemTemplate.InheritsFrom(inheritedTemplateItem.ID, item.Database));
        }

        public static bool IsDerived(this Item item, ID templateId)
        {
            if (item == null)
            {
                return false;
            }

            return !templateId.IsNull && item.IsDerived(item.Database.GetItem(templateId, item.Language));
        }

        public static IEnumerable<Item> GetDescendantsOfTemplate(this Item item, ID templateId)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));
            }

            return item.Axes.GetDescendants().Where(i => i.IsDerived(templateId));
        }

    }
}