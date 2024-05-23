namespace Pmi.Certification.Functional.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using Microsoft.Extensions.Configuration;
    using Pmi.Web.Ui.Framework;

    public class UserSettings
    {
        private readonly IEnumerable<IConfigurationSection> _configSection;

        public UserSettings()
        {
            var configManager = new ConfigManager("appsettings.json");
            _configSection = configManager.Configuration.GetSection("UserConfiguration").GetChildren();
        }

        public string BaseUrl => _configSection.FirstOrDefault(k => k.Key.Equals("BaseUrl"))?.Value;
        public TimeSpan DefaultExplicitWaitTimeout => TimeSpan.FromSeconds(
            Convert.ToDouble(_configSection.FirstOrDefault(k => k.Key.Equals("DefaultExplicitWaitTimeout"))?.Value));
        public string Environment => _configSection.FirstOrDefault(k => k.Key.Equals("Environment"))?.Value;
        public string BaseEnv => _configSection.FirstOrDefault(k => k.Key.Equals("BaseEnv"))?.Value;
        public string IdpBaseUrl => _configSection.FirstOrDefault(k => k.Key.Equals("IdpBaseUrl"))?.Value;
        public string AddAddressEndpoint => _configSection.FirstOrDefault(k => k.Key.Equals("AddAddressEndpoint"))?.Value;
        public string RegistrationEndpoint => _configSection.FirstOrDefault(k => k.Key.Equals("RegistrationEndpoint"))?.Value;
        public string DefaultPassword => _configSection.FirstOrDefault(k => k.Key.Equals("DefaultPassword"))?.Value;
        public string CurrentExecutionDirectory => Path.GetDirectoryName(new Uri(Assembly.GetExecutingAssembly().CodeBase).LocalPath);
        public TimeSpan Timeout => TimeSpan.FromSeconds(
            Convert.ToDouble(_configSection.FirstOrDefault(k => k.Key.Equals("Timeout"))?.Value));
        public TimeSpan OperationTimeout => TimeSpan.FromSeconds(
            Convert.ToDouble(_configSection.FirstOrDefault(k => k.Key.Equals("OperationTimeout"))?.Value));
    }
}