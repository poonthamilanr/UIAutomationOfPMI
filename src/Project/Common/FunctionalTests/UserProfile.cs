namespace Pmi.Certification.Functional.Tests
{
    using FluentAssertions;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;

    public static class UserProfile
    {
        static UserSettings _userSettings = new UserSettings();

        public static void UpdateAddress(string username)
        {
            var userProfileJson = $@"{_userSettings.CurrentExecutionDirectory}\UserProfile.json";

            var addressContent = File.ReadAllText(userProfileJson).Replace("##UserName##", username);

            using (var client = new HttpClient())
            {
                var profileToken = new AccessToken();

                var token = profileToken.GetAccessToken("esp3_prfsvc_client", "PRFSVC");

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var stringContent = new StringContent(addressContent, Encoding.UTF8, "application/json");

                var response = client.PostAsync(_userSettings.AddAddressEndpoint, stringContent).Result;

                response.StatusCode.Should().Be(HttpStatusCode.OK);
            }
        }
    }
}