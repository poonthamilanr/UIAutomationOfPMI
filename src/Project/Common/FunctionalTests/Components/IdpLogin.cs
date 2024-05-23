#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests
{
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Web.Ui.Framework.Extensions;
    using Pmi.Web.Ui.Framework.Page;
    using System;

    /// <summary>
    ///     Login to system through IDP login page.
    /// </summary>
    public class IdpLogin : PageComponent<IdpLogin>
    {

        private IWebElement LoginButton => Page.WebDriver.FindElement(By.Id("login_btn"));

        private IWebElement Password => Page.WebDriver.FindElement(By.Id("Password"));

        private IWebElement UserName => Page.WebDriver.FindElement(By.Id("Username"));

        /// <summary>
        ///     Initializes a new instance of the <see cref="IdpLogin" /> class.
        /// </summary>
        /// <param name="page">The page the component is on.</param>
        /// <param name="rootElement">The root element.</param>
        /// <param name="timeout">The timeout.</param>
        public IdpLogin(IPage page, IWebElement rootElement, TimeSpan? timeout) : base(page, rootElement, timeout)
        {
            var userSettings = new UserSettings();
            _wait = new WebDriverWait(page.WebDriver, userSettings.DefaultExplicitWaitTimeout);
        }
        private readonly WebDriverWait _wait;

        /// <summary>
        ///     Gets the root element.
        /// </summary>
        /// <value>
        ///     The root element.
        /// </value>
        public static By RootElement => By.XPath("//fieldset");

        /// <summary>
        ///     Logins the specified username.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <param name="password">The password.</param>
        /// <returns></returns>
        public IdpLogin Login(string username, string password)
        {
            UserName.Wait(Page.WebDriver)
                .ScrollToElement(Page.WebDriver)
                .SendKeys(username.ToCharArray());
            Password.Wait(Page.WebDriver)
                .ScrollToElement(Page.WebDriver)
                .SendKeys(password.ToCharArray());
            LoginButton.Wait(Page.WebDriver)
                .ScrollToElement(Page.WebDriver)
                .Click(true);
            return this;
        }
    }
}
