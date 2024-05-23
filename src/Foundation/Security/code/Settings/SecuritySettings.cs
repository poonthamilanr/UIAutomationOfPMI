using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SC = Sitecore;
namespace Pmi.Anc.Certification.Foundation.Security.Settings
{
    public class SecuritySettings :ISecuritySettings
    {
        private const string IDPAuthorityKey = "Pmi.Anc.Certification.Foundation.Security.Settings.IDPAuthority";
        private const string IDPClientIdKey = "Pmi.Anc.Certification.Foundation.Security.Settings.IDPClientId";

        public string IDPAuthority => SC.Configuration.Settings.GetSetting(SecuritySettings.IDPAuthorityKey);
        public string IDPClientId => SC.Configuration.Settings.GetSetting(SecuritySettings.IDPClientIdKey);
    }
}