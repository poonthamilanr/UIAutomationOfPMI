using System.Collections.Generic;
using SC = Sitecore;

namespace Pmi.Anc.Certification.Foundation.Security.CertCors.Settings
{
    public class CertCorsSettings : ICertCorsSettings
    {
       private const string AllowedOriginsKey = "Pmi.Anc.Certification.Foundation.Security.CertCors.Settings.AllowedOrigins";

        public virtual IEnumerable<string> Origins => SC.Configuration.Settings.GetSetting(AllowedOriginsKey).Split(',');

    }
}