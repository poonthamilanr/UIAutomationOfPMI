using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pmi.Anc.Certification.Foundation.Security.CertCors.Settings
{
    public interface ICertCorsSettings
    {
        IEnumerable<string> Origins { get; }
    }
}
