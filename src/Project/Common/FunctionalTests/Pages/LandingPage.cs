#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests.Pages
{
    using FluentAssertions;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Web.Ui.Framework.Extensions;
    using Pmi.Web.Ui.Framework.Page;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class LandingPage : BasePage<LandingPage>
    {
        protected WebDriverWait _wait;
        private readonly UserSettings _userSettings;

        public override string RelativePath => "/landing";

        public override string BaseUrl => _userSettings.BaseUrl;

        public static By HeaderContent => By.XPath(".//div[@class='app-header__controls']");

        public static By MyPmiMenu => By.XPath(".//*[@id='pmi-my-account-menu']");

        private IList<IWebElement> MyPmiAccountMenus => WebDriver.FindElements(By.XPath(".//a/*[@class='account-menu__item-label']"));

        private IWebElement SuccessMessage => WebDriver.FindElement(By.XPath("//div[@class='information__description-wrapper']/h2"));
        private IWebElement GenericError => WebDriver.FindElement(By.XPath("//div[contains(@class,'information__description')]/h2[contains(text(),'cannot start an application')]"));

        public override LandingPage VerifyPageLoaded()
        {
            WebDriver.WaitUntilWebElementIsFound(HeaderContent);
            return this;
        }
        public LandingPage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            base.VerifyPageLoaded();
        }

        private bool SuccessMessageDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => SuccessMessage.Displayed && SuccessMessage.Enabled
        || SuccessMessage.Text.Contains("Your application has been approved") || SuccessMessage.Text.Contains("Your application has been submitted"), false);

        public LandingPage VerifySubmit(string certType)
        {
            _wait.Until(_ => SuccessMessageDisplayed());
            return this;
        }

        public LandingPage Logout()
        {
            MyPmiMenu.FindElement(WebDriver).Wait(WebDriver, 3)
                .ScrollToElement(WebDriver)
                .ActionClick(WebDriver);
            var targetMenu = MyPmiAccountMenus.Wait(WebDriver).FirstOrDefault(p => p.Text.Trim().Equals("Log Out"));
            targetMenu.ActionClick(WebDriver);
            return this;
        }
        public LandingPage VerifyGenericErrorPage()
        {
            GenericError.Wait(WebDriver, 10).Displayed.Should().BeTrue("Generic Error Page Displayed");
            return this;
        }
    }
}
