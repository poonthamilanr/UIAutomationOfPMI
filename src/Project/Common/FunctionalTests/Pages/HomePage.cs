#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests.Pages
{
    using NUnit.Framework;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Web.Ui.Framework.Page;
    using System;

    public class HomePage : BasePage<HomePage>
    {
        public override string RelativePath => "/";
        private readonly WebDriverWait _wait;
        private readonly UserSettings _userSettings;
        public HomePage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            TimeSpan? timeout = _userSettings.Timeout;
            try
            {
                _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
            }
            catch (Exception)
            {
                //TODO
            }
            base.VerifyPageLoaded();
        }
        public override string BaseUrl => _userSettings.BaseUrl;
        private IWebElement RegisterButton => WebDriver.FindElement(By.Id("registerlink"));
        private IWebElement LoginButton => WebDriver.FindElement(By.Id("loginlink"));

        private By MainContent => By.Id("menus");

        public override HomePage VerifyPageLoaded()
        {
            var expectedHomeUrl = $"{_userSettings.BaseUrl.TrimEnd('/')}/";

            _wait.Until(d => WebDriver.Url.StartsWith(expectedHomeUrl));
            return base.VerifyPageLoaded();
        }

        public HomePage VerifyRegisterButton()
        {
            Assert.IsTrue(RegisterButton.Displayed);
            return this;
        }

        public HomePage VerifyLoginButton()
        {
            Assert.IsTrue(LoginButton.Displayed);
            return this;
        }
    }
}
