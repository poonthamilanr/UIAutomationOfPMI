namespace Pmi.Certification.Functional.Tests.Steps
{
    using Pmi.Certification.Functional.Tests.Pages;
    using Pmi.Web.Ui.Framework.Extensions;
    using TechTalk.SpecFlow;

    public static class TestsStepExtensions
    {
        static UserSettings _userSettings = new UserSettings();

        public static void Login(this ScenarioContext context, string user, string password = "")
        {
            var _password = string.IsNullOrEmpty(password) ? _userSettings.DefaultPassword : password;
            context.VerifyPage<LoginPage>()
                .GetComponent<IdpLogin>(IdpLogin.RootElement)
                .Login(user, _password);
            context.VerifyPage<HomePage>();
        }

    }
}