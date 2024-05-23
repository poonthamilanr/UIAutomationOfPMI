using System.Collections.Generic;
using Pmi.Anc.Certification.Foundation.Navigation.Models;

namespace Pmi.Anc.Certification.Foundation.Navigation.Services
{
    public interface INavigationService
    {
        CertNavigation GetAccountMenuItems(string returnUrl);
    }
}
