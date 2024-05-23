#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests.Pages
{
    using System;
    using System.Collections.Generic;
    using FluentAssertions;
    using NUnit.Framework;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Certification.Functional.Tests.Hooks;
    using Pmi.Web.Ui.Framework.Extensions;
    using Pmi.Web.Ui.Framework.Page;
    public class ExperienceSummariesPage : BasePage<ExperienceSummariesPage>
    {
        public override string RelativePath => "/";
        protected WebDriverWait _wait;
        private readonly UserSettings _userSettings;
        private string ProjectDescription => "Project management is the process of leading the work of a team to achieve all project goals within the given constraints. " +
            "This information is usually described in project documentation, created at the beginning of the development process. The primary constraints are scope, time, and budget. " +
            "The secondary challenge is to optimize the allocation of necessary inputs and apply them to meet pre-defined objectives. " +
            "The objective of project management is to produce a complete project which complies with the client's objectives. In many cases, the objective of project management " +
            "is also to shape or reform the client's brief to feasibly address the client's objectives. Once the client's objectives are clearly established they should influence all " +
            "decisions made by other people involved in the project, for example, project managers, designers, contractors, sub-contractors. Ill-defined or too tightly prescribed project " +
            "management objectives are detrimental to decision making. A project is a temporary and unique endeavor designed to produce a product, service, or result with a defined beginning " +
            "and end undertaken to meet unique goals and objectives, typically to bring about beneficial change or added value. The temporary nature of projects stands in contrast with business " +
            "as usual. In practice, the management of such distinct production approaches requires the development of distinct technical skills and management strategies. Different approaches to " +
            "project management are Benefits realization management, Critical path method, Critical chain project management, Earned value management, Iterative and incremental project management, " +
            "Lean project management, Process-based management, Project production management, Product-based planning.";

        public ExperienceSummariesPage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            VerifyPageLoaded();
        }

        private static By PmiLogo => By.XPath("//header[@class='dsm app-header']//a");
        public override string BaseUrl => _userSettings.BaseUrl;

        public ExperienceSummariesPage VerifyPmiLogo()
        {
            TimeSpan? timeout = _userSettings.Timeout;
            try
            {
                _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
                Assert.IsTrue(WebDriver.WaitUntilWebElementIsFound(PmiLogo).Displayed);
            }
            catch (Exception)
            {

            }
            return this;
        }

        private IWebElement ExpSummaryHeading => WebDriver.FindElement(By.XPath("//h2[contains(text(), 'Experience Summaries')]"));
        private IWebElement ContinueToExamDetails => WebDriver.FindElement(By.XPath("//button[contains(text(),'Continue To Exam Details')]"));
        private IWebElement ExperienceSummariesHeaderTest => WebDriver.FindElement(By.XPath("//h2[contains(text(),'Experience Summaries')]"));
        private IWebElement ExamDetailsHeaderText => WebDriver.FindElement(By.XPath("//div[@class = 'heading']/h2"));
        private IWebElement ExperienceSummariesBeardCrumb => WebDriver.FindElement(By.XPath("//span[@class='breadcrumbs__title'][text()='Experience Summaries']"));

        public By ContinueExamDetails => By.XPath("//span[text()='Continue to Exam Details']");
        private static string RadioButton => "//h3[text()='{0}']//following-sibling::div//span/div";
        private static string ProgramReference => "//h3[text()='{0}']//following-sibling::div//label[@for = 'experienceId_select']/following-sibling::div/div";
        private static string ProgramReferenceList => "//h3[text()='{0}']//following-sibling::div//label[@for = 'experienceId_select']/following-sibling::div/div//li[text()= '{1}']";//Project Title
        private static string SummariesDescriptonField => "//h3[text()='{0}']//following-sibling::div//textarea";
        private static string SaveSummaries => "//h3[text()='{0}']//following-sibling::div//button[contains(text(),'Save')]";
        private static string CancelSummaries => "//h3[text()='{0}']//following-sibling::div//button[contains(text(),'Cancel')]";
        private static string SummariesHeading => "//span[text()='{0}']";
        private static string EditSummariesButton => "//span[text()='{0}']/parent::div/following-sibling::div[@class = 'experience__buttons']/a[text() = 'Edit Summary']";
        private static string ExperienceSummariesSummary => "//div[@class = 'experience-summaries-summary']//div[text() = '{0}']/following-sibling::div";

        private bool ExpSummHeadingDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => ExpSummaryHeading.Displayed, false);

        public ExperienceSummariesPage FillExperienceSummariesDetails(TestData testData)
        {
            var experienceSummariesType = new List<string>();
            _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
            _wait.Until(_ => ExpSummHeadingDisplayed());
            if (testData.CertType.ToUpper().Equals(CertificationType.PgMP))
                experienceSummariesType = new List<string> { "Strategic Program Management", "Benefits Realization", "Stakeholder Management", "Governance", "Program Life Cycle" };
            if (testData.CertType.ToUpper().Equals(CertificationType.PfMP))
                experienceSummariesType = new List<string> { "Strategic Alignment", "Governance", "Portfolio Performance", "Portfolio Risk Management", "Communications Management" };

            for (int startIndex = 0; startIndex < experienceSummariesType.Count; startIndex++)
            {
                WebDriver.FindElement(By.XPath(string.Format(RadioButton, experienceSummariesType[startIndex]))).Wait(WebDriver).Click(true);
                WebDriver.FindElement(By.XPath(string.Format(ProgramReference, experienceSummariesType[startIndex]))).Wait(WebDriver).Click(true);
                WebDriver.FindElement(By.XPath(string.Format(ProgramReferenceList, experienceSummariesType[startIndex], testData.ProjectTitle))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
                WebDriver.FindElement(By.XPath(string.Format(SummariesDescriptonField, experienceSummariesType[startIndex]))).Wait(WebDriver).Click(true);
                WebDriver.FindElement(By.XPath(string.Format(SummariesDescriptonField, experienceSummariesType[startIndex]))).Wait(WebDriver).SendKeys(ProjectDescription);
                WebDriver.FindElement(By.XPath(string.Format(SaveSummaries, experienceSummariesType[startIndex]))).Wait(WebDriver, 1).Click();
                _wait.Until(_ => Extensions.Extensions.CatchUnavailableElement(() => WebDriver.FindElement(By.XPath
                    (string.Format(EditSummariesButton, experienceSummariesType[startIndex]))).Displayed, false));
            }
            return this;
        }

        public ExperienceSummariesPage VerifyExperienceSummariesDetails(TestData testData)
        {
            try
            {
                var experienceSummariesType = new List<string>();
                if (testData.CertType.ToUpper().Equals(CertificationType.PgMP))
                    experienceSummariesType = new List<string> { "Strategic Program Management", "Benefits Realization", "Stakeholder Management", "Governance", "Program Life Cycle" };
                if (testData.CertType.ToUpper().Equals(CertificationType.PfMP))
                    experienceSummariesType = new List<string> { "Strategic Alignment", "Governance", "Portfolio Performance", "Portfolio Risk Management", "Communications Management" };
                int counter = 0;
                for (int startIndex = 0; startIndex < experienceSummariesType.Count; startIndex++)
                {
                    WebDriver.FindElement(By.XPath(string.Format(ExperienceSummariesSummary, experienceSummariesType[startIndex]))).GetCssValue("color").Should().Equals("rgba(67, 168, 62, 1)");
                    counter++;
                }
                counter.Should().Equals(experienceSummariesType.Count);
            }
            catch (Exception exception)
            {
                Console.WriteLine("VerifyExperienceSummariesDetails" + exception);
            }
            return this;
        }

        private bool ExpSummBreadCrumbDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => ExperienceSummariesBeardCrumb.Displayed, false);
        private bool ContinueToExamDetailsClickable() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToExamDetails.Displayed && ContinueToExamDetails.Enabled, false);

        public ExperienceSummariesPage VerifyAndClickContinueToExamDetails()
        {
            _wait.Until(_ => ContinueToExamDetailsClickable());
            ContinueToExamDetails.Enabled.Should().BeTrue("Continue To Exam Details is not Enabled");
            ContinueToExamDetails.Click(true);
            _wait.Until(_ => !ContinueToExamDetailsClickable());
            WebDriver.WaitUntilWebElementIsFound(d => ExamDetailsHeaderText, _userSettings.Timeout);
            _wait.Until(_ => ExpSummBreadCrumbDisplayed());
            return this;
        }

    }
}