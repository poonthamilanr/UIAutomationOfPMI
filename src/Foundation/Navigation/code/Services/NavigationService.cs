using System.Collections.Generic;
using System.Web;
using Pmi.Anc.Certification.Foundation.Navigation.Models;
using Pmi.Anc.Certification.Foundation.Security.Settings;

namespace Pmi.Anc.Certification.Foundation.Navigation.Services
{
    public class NavigationService : INavigationService
    {
        private readonly ISecuritySettings _securitySettings;

        public NavigationService(ISecuritySettings securitySettings)
        {
            _securitySettings = securitySettings;
        }

        private MenuItem GetLogoutMenuItem(string returnUrl)
        {
            var logoutUrl = $"{_securitySettings.IDPAuthority}/account/logout?clientid={_securitySettings.IDPClientId}&returnUrl={HttpUtility.UrlEncode(returnUrl)}";

            return new MenuItem
            {
                Type = "Logout",
                Url = logoutUrl
            };
        }

        public CertNavigation GetAccountMenuItems(string returnUrl)
        {
            var navigation = new CertNavigation
            {
                AccountMenuItems = new List<MenuItem>
                {
                    GetLogoutMenuItem(returnUrl)
                }
            };

            return navigation;
        }
    }
}