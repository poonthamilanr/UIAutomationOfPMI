using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pmi.Anc.Certification.Foundation.Security.Settings
{
    public interface ISecuritySettings
    {
        string IDPAuthority { get; }
        string IDPClientId { get; }
    }
}