#pragma warning disable CS0618 

namespace Pmi.Certification.Functional.Tests.Extensions
{
    using System;
    using OpenQA.Selenium;
    using System.Drawing;
    using OpenQA.Selenium.Support.UI;
    using OpenQA.Selenium.Support.Extensions;
    using Pmi.Web.Ui.Framework.Extensions;
    using System.Threading;

    public static class Extensions
    {
        static UserSettings _userSettings = new UserSettings();

        public static void ClearData(this IWebElement element)
        {
            if (element == null) throw new ArgumentNullException(nameof(element));

            element.SendKeys(Keys.Control + "a" + Keys.Delete);
        }

        /// <summary>
        ///     Waits the element location to be stable
        /// </summary>
        /// <param name="element">The element.</param>
        /// <param name="driver">The driver.</param>
        /// <param name="timeout">Timeout in seconds. Default is 30 seconds.</param>
        /// <returns></returns>
        public static IWebElement WaitForSteadiness(this IWebElement element, IWebDriver driver, int timeout = 0)
        {
            var waitTimeout = timeout == 0 ? _userSettings.OperationTimeout : TimeSpan.FromSeconds(timeout);
            var _location = new Point();

            var wait = new WebDriverWait(driver, waitTimeout);
            wait.Until(
                d =>
                {
                    try
                    {
                        if (element.Location == _location)
                        {
                            return true;
                        }
                        else
                        {
                            _location = element.Location;
                            return false;
                        }

                    }
                    catch (Exception)
                    {
                        return false;
                    }
                });

            return element;
        }

        /// <summary>
        ///     Catches a NoSuchElementException or a StaleElementReferenceException for a function
        /// </summary>
        /// <param name="func">A function using an element.</param>
        public static bool CatchUnavailableElement(Func<bool> func, bool resultWhenUnavailable)
        {
            try
            {
                return func();
            }
            catch (NoSuchElementException)
            {
                return resultWhenUnavailable;
            }
            catch (StaleElementReferenceException)
            {
                return resultWhenUnavailable;
            }

        }

        /// <summary>
        ///     Waits for loader to disappear
        /// </summary>
        /// <param name="driver">The driver.</param>
        public static void WaitForLoaderInvisible(this IWebDriver driver)
        {

            var totalWait = new WebDriverWait(driver, _userSettings.OperationTimeout);
            totalWait.Until(
                d =>
                {
                    totalWait.Until(_ => CatchUnavailableElement(() => !driver.FindElement(Loader.PageLoader).Displayed, true));

                    return driver.FindElements(Loader.PageLoader).Count == 0;

                });

        }

        public static void EmptyTheTextField(this IWebElement element, IWebDriver driver)
        {
            var totalWait = new WebDriverWait(driver, _userSettings.OperationTimeout);
            totalWait.Until(
                d =>
                {
                    element.SendKeys(Keys.Backspace);

                    return (element.GetAttribute("value").Equals(""));
                });

        }

        public static void RaiseClickEvent(this IWebElement element, IWebDriver driver)
        {
            driver.ExecuteJavaScript("arguments[0].click();", element);
        }

        public static IWebElement RetryClick(this IWebElement element)
        {
            //Continue to cart seems to be not working all the time. So adding retry logic.
            var timeout = DateTime.Now.AddSeconds(_userSettings.OperationTimeout.TotalSeconds);
            do
            {
                try
                {
                    if (DateTime.Now > timeout) break;
                    var innerText = element.Text;
                    //Click operation is async - page won't be locked from execution
                    element.Click(true).LockExecution();
                    if (element.Exists() && element.Displayed && element.Text.Equals(innerText)) continue;
                    break;
                }
                catch (Exception)
                {
                    Thread.Sleep(TimeSpan.FromSeconds(1));
                }
            } while (true);

            return element;
        }

        public static IWebElement LockExecution(this IWebElement element)
        {
            Thread.Sleep(100);
            return element;
        }
    }
}
