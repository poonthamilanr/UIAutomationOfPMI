#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests.Pages
{
    using FluentAssertions;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Certification.Functional.Tests.Extensions;
    using Pmi.Certification.Functional.Tests.Hooks;
    using Pmi.Web.Ui.Framework.Page;
    using System.Threading;

    public class VirtualPage : BasePage<VirtualPage>
    {
        private readonly UserSettings _userSettings;

        private IWebElement AppHeading => WebDriver.FindElement(By.XPath("//div[@class='container']/h1[contains(@class, 'app-header__title')]"));

        private IWebElement Body => WebDriver.FindElement(By.XPath("//body"));

        private IWebElement PmiLogo => WebDriver.FindElement(By.XPath("//header[@class='dsm app-header']//a"));

        private readonly WebDriverWait _wait;

        public VirtualPage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
        }

        public override string RelativePath => "/";

        public override string BaseUrl => _userSettings.BaseUrl;

        private bool BodyClickable() => Extensions.CatchUnavailableElement(() => Body.Displayed && Body.Enabled, false);

        private bool AppHeadingDisplayed() => Extensions.CatchUnavailableElement(() => AppHeading.Displayed, false);

        private bool PMILogoDisplayed() => Extensions.CatchUnavailableElement(() => PmiLogo.Displayed && PmiLogo.Enabled, false);

        public VirtualPage VerifyApplicationHeading(TestData testData)
        {
            VerifyPageLoaded();
            WebDriver.WaitForLoaderInvisible();
            Thread.Sleep(5000);
            _wait.Until(_ => PMILogoDisplayed());
            _wait.Until(_ => AppHeadingDisplayed());
            _wait.Until(_ => BodyClickable());
            if (testData.CertType.ToUpper().Equals(CertificationType.RMP) || testData.CertType.ToUpper().Equals(CertificationType.PBA) ||
                    testData.CertType.ToUpper().Equals(CertificationType.SP) || testData.CertType.ToUpper().Equals(CertificationType.ACP) ||
                    testData.CertType.ToUpper().Equals(CertificationType.CPBEP))
            {
                AppHeading.Text.ToLower().Should().Contain(testData.CertType.Substring(4));
            }
            else
            {
                AppHeading.Text.ToLower().Should().Contain(testData.CertType);
            }
            return this;
        }
    }
}
