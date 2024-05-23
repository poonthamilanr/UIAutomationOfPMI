namespace Pmi.Certification.Functional.Tests
{
    using FluentAssertions;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;

    public static class UserRegistration
    {
        static UserSettings _userSettings = new UserSettings();

        public static void RegisterUser(string username, string email, string password, string country)
        {
            var userRegistrationJson = $@"{_userSettings.CurrentExecutionDirectory}\UserRegistration.json";

            var addressContent = File.ReadAllText(userRegistrationJson).Replace("##UserName##", username).Replace("##Email##", email).Replace("##Password##", password).Replace("##Country##", country);

            using (var client = new HttpClient())
            {
                
                var registrationToken = new AccessToken();

                var token = registrationToken.GetAccessToken("esp3_reg_client", "REGSVC");

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var stringContent = new StringContent(addressContent, Encoding.UTF8, "application/json");

                var response = client.PostAsync(_userSettings.RegistrationEndpoint, stringContent).Result;

                response.StatusCode.Should().Be(HttpStatusCode.OK);
            }
        }

       
    }
}

