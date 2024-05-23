#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests.Steps
{
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Web.Ui.Framework.Page;

    public class LoginPage : BasePage<LoginPage>
    {
        private readonly UserSettings _userSettings;

        private IWebElement LoginButton => WebDriver.FindElement(By.Id("login_btn"));

        private readonly WebDriverWait _wait;

        public LoginPage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
        }

        public override string RelativePath => "/account/login";

        public override string BaseUrl => _userSettings.BaseUrl;

        private bool LoginButtonClickable() => Extensions.Extensions.CatchUnavailableElement(() => LoginButton.Displayed && LoginButton.Enabled, false);

        public override LoginPage VerifyPageLoaded()
        {
            _wait.Until(_ => LoginButtonClickable());
            return base.VerifyPageLoaded();
        }
    }
}
