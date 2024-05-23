#pragma warning disable 618

namespace Pmi.Certification.Functional.Tests
{
    using FluentAssertions;
    using Newtonsoft.Json.Linq;
    using System.Collections.Generic;
    using System.Net;
    using System.Net.Http;

    public class AccessToken
    {
        public string GetAccessToken(string clientId, string scope)
        {
            string token = null;

            using (var client = new HttpClient())
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                var _userSettings = new UserSettings();
                var request = new HttpRequestMessage(HttpMethod.Post, _userSettings.IdpBaseUrl + "/connect/token")
                {
                    Content = new FormUrlEncodedContent(new Dictionary<string, string>
                    {
                        {"client_id", clientId},
                        {"client_secret", _userSettings.DefaultPassword},
                        {"scope", scope},
                        {"grant_type", "client_credentials"}
                    })
                };

                var response = client.SendAsync(request).Result;
                response.StatusCode.Should().Be(HttpStatusCode.OK);

                var payload = JObject.Parse(response.Content.ReadAsStringAsync().Result);
                token = payload.Value<string>("access_token");

            }

            return token;
        }
    }
}
