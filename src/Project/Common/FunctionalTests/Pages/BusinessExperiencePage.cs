#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests
{
    using FluentAssertions;
    using NUnit.Framework;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Certification.Functional.Tests.Extensions;
    using Pmi.Certification.Functional.Tests.Hooks;
    using Pmi.Web.Ui.Framework.Extensions;
    using Pmi.Web.Ui.Framework.Page;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    public class BusinessExperiencePage : BasePage<BusinessExperiencePage>
    {
        public override string RelativePath => "/";
        protected WebDriverWait _wait;
        private readonly UserSettings _userSettings;
        public static int AddExperienceCount = 0;
        private string ProjectDescriptionText => "Project management is the process of leading the work of a team to achieve all project goals within the given constraints. " +
            "This information is usually described in project documentation, created at the beginning of the development process. The primary constraints are scope, time, and budget. " +
            "The secondary challenge is to optimize the allocation of necessary inputs and apply them to meet pre-defined objectives. " +
            "The objective of project management is to produce a complete project which complies with the client's objectives. In many cases, the objective of project management " +
            "is also to shape or reform the client's brief to feasibly address the client's objectives. Once the client's objectives are clearly established they should influence all " +
            "decisions made by other people involved in the project, for example, project managers, designers, contractors, sub-contractors. Ill-defined or too tightly prescribed project " +
            "management objectives are detrimental to decision making.";

        public BusinessExperiencePage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            VerifyPageLoaded();
        }

        private static By PmiLogo => By.XPath("//header[@class='dsm app-header']//a");
        public override string BaseUrl => _userSettings.BaseUrl;

        private IWebElement ExperienceHeading => WebDriver.FindElement(By.XPath("//div/h2[contains(text(),'Experience')]"));
        public IList<IWebElement> _experienceSectionValues => WebDriver.FindElements(By.XPath("//div[@class = 'experience-property__value']"));
        private IWebElement RemoveExperience => WebDriver.FindElement(By.XPath("(//div[@class='experience__buttons']/a[text()='Remove Experience'])[1]"));
        private IWebElement RemoveExperienceInPopUp => WebDriver.FindElement(By.XPath("//button[text()='Remove Experience']"));
        private IWebElement EditExperience => WebDriver.FindElement(By.XPath("//div[@class='experience__buttons']/a[text()='Edit Experience']"));
        private IWebElement ContinueToExamDetails => WebDriver.FindElement(By.XPath("//button[text()='Continue To Exam Details']"));

        internal IList<IWebElement> ExperienceSummaryCourseValues => WebDriver.FindElements(By.XPath("//div[@class = 'summary__course-line']/div"));
        private IWebElement ExperienceBeardCrumb => WebDriver.FindElement(By.XPath("//ul[contains(@class, 'breadcrumbs')]/li[contains(@class, 'breadcrumbs__item_passed')]//span[text()='Experience']"));

        private IWebElement ExperienceSummariesBeardCrumb => WebDriver.FindElement(By.XPath("//ul[@class = 'breadcrumbs']/li[@class='breadcrumbs__item breadcrumbs__item_passed']//span[text()='Experience Summaries']"));

        //New ExperiencePageLocators
        private static string ProjectTitleNew => "//h2[text()='{0}']//parent::div//following-sibling::form//input[@id='projectTitle_input']";
        private static string OrganizationNew => "//h2[text()='{0}']//parent::div//following-sibling::form//input[@id='company_input']";
        private static string JobTitleNew => "//h2[text()='{0}']//parent::div//following-sibling::form//input[@id='jobTitle_input']";
        private static string FunctionalReportingAreaNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='functionalAreaTypeEnum_select']/following-sibling::div";
        private static string OrganizationPrimaryFocusNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='primaryFocusTypeEnum_select']/following-sibling::div";
        private static string StartMonth => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/preceding-sibling::div/child::div[1]/div[@role='button']";
        private static string StartYear => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/preceding-sibling::div/child::div[2]/div[@role='button']";
        private static string EndMonth => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/following-sibling::div/child::div[1]/div[@role='button']";
        private static string EndYear => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/following-sibling::div/child::div[2]/div[@role='button']";
        private static string FunctionalReportingAreaListNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='functionalAreaTypeEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string OrganizationPrimaryFocusListNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='primaryFocusTypeEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string ProjectStartDateMonthList => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/preceding-sibling::div/child::div[1]/div//ul/li[text()='{1}']";
        private static string ProjectStartDateYearList => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/preceding-sibling::div/child::div[2]/div//ul/li[text()='{1}']";
        private static string ProjectEndDateMonthList => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/following-sibling::div/child::div[1]/div//ul/li[text()='{1}']";
        private static string ProjectEndDateYearList => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/following-sibling::div/child::div[2]/div//ul/li[text()='{1}']";
        private static string SaveExperienceButtonNew => "//h2[text()='{0}']//parent::div//following-sibling::form//button[contains(text(),'Save')]";
        private static string RemoveExperienceNew => "//h2[contains(text(), '{0}')]//parent::div//following-sibling::div//a[text()='Remove Experience']";
        private static string AddAdditionalExperienceNew => "//h2[text()='{0}']//parent::div/following-sibling::div/following-sibling::a[contains(text(), 'Additional')]";
        private static string SummaryHoursNew => "//h2[text()='{0}']//parent::div//parent::div//following-sibling::div//div[@class='summary__hours']";
        private static string ExperienceHeadingValueNew => "//h2[contains(text(), '{0}')]//parent::div//following-sibling::div//div[contains(@class , 'experience__header')]/span";
        private static string ExperienceSectionValuesNew => "//h2[contains(text(), '{0}')]//parent::div//following-sibling::div//div[@class = 'experience-property__value']";
        private static string ExperienceSummaryCourseValuesNew => "//h2[contains(text(), '{0}')]//parent::div//parent::div//following-sibling::div//div[@class = 'summary__course-line']/div";
        private static string OtherOrganizationPrimaryFocus => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='primaryFocusTypeEnum_select']/following-sibling::div//input";
        private static string OtherFunctionalReportingArea => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='functionalAreaTypeEnum_select']/following-sibling::div//input";
        private IWebElement ContinueToPortfolioExp =>
                  WebDriver.FindElement(By.XPath("//button[text()='Continue To Portfolio Experience']"));
        public BusinessExperiencePage VerifyPmiLogo()
        {
            TimeSpan? timeout = _userSettings.Timeout;

            try
            {
                _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
                Assert.IsTrue(WebDriver.WaitUntilWebElementIsFound(PmiLogo).Displayed);
            }
            catch (Exception _exception)
            {
                Console.WriteLine(_exception);
            }

            return this;

        }

        public BusinessExperiencePage FillExperienceDetails(TestData testData, String experienceType)
        {
            Thread.Sleep(5000);
            AddExperienceDetails(testData, experienceType);
            WebDriver.FindElement(By.XPath(string.Format(SaveExperienceButtonNew, experienceType))).Wait(WebDriver, 5).ActionClick(WebDriver);
            _wait.Until(_ => !SaveExperienceBtnVisible(experienceType));
            Thread.Sleep(3000);
            _wait.Until(_ => ContinueToPortfolioExperienceEnabled());
            return this;
        }

        private bool SaveExperienceBtnVisible(string experienceType)
        {
            return Extensions.Extensions.CatchUnavailableElement(() => WebDriver.FindElement(By.XPath(string.Format(SaveExperienceButtonNew, experienceType))).Displayed &&
                WebDriver.FindElement(By.XPath(string.Format(SaveExperienceButtonNew, experienceType))).Enabled, false);
        }
        public BusinessExperiencePage VerifyExperienceDetails(TestData testData, String experienceType)
        {
            try
            {
                var expectedProjectExperienceDetails = new List<string>
                {
                testData.Organization,
                testData.JobTitle,
                testData.FunctionalReportingArea,
                testData.OrganizationPrimaryFocus,
                testData.ProjectStartMonth + ", " + testData.ProjectStartYear + " - "
                    + testData.ProjectEndMonth + ", " + testData.ProjectEndYear,
                ProjectDescriptionText,
                };
                WebDriver.FindElement(By.XPath(String.Format(ExperienceHeadingValueNew, experienceType))).Wait(WebDriver).Text.Should().Be(testData.ProjectTitle, "Actual Experience Heading is not met with expected heading");
                var actualExperienceDetails = new List<string>(WebDriver.FindElements(By.XPath(String.Format(ExperienceSectionValuesNew, experienceType))).Select(x => x.Text));
                foreach (String actualListValue in actualExperienceDetails)
                {
                    if (!expectedProjectExperienceDetails.Contains(actualListValue))
                    {
                        Console.WriteLine("The actual academic value '" + actualListValue + "' is not met with expected academic value");
                        Assert.Fail();
                    }
                }
                WebDriver.FindElement(By.XPath(String.Format(RemoveExperienceNew, experienceType))).Displayed.Should().BeTrue("Remove Experience is not Displayed/Enabled");
            }
            catch (Exception _exception)
            {
                Console.WriteLine(_exception);
            }
            return this;
        }

        private bool ContinueToPortfolioExperienceEnabled() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToPortfolioExp.Displayed && ContinueToPortfolioExp.Enabled, false);

        public BusinessExperiencePage VerifyExperienceSummaryDetails(TestData _testData, string experienceType)
        {
            int actualCourseMonths1 = 0, actualCourseMonths2 = 0, expectedTotalSummaryValues = 0;
            var actualCourseSummaryValues = WebDriver.FindElements(By.XPath(String.Format(ExperienceSummaryCourseValuesNew, experienceType))).Wait(WebDriver, 5).Select(x => x.Text.Replace(" Months", "")).ToList();
            actualCourseSummaryValues[0].Should().Equals(_testData.ProjectTitle);
            int.TryParse(actualCourseSummaryValues[1], out actualCourseMonths1);
            //int actualCourseMonths1 = Convert.ToInt16(actualCourseSummaryValues[1]);
            if (actualCourseSummaryValues.Count > 2)
            {
                int.TryParse(actualCourseSummaryValues[3], out actualCourseMonths2);
            }
            var expectedValueString = WebDriver.FindElement(By.XPath(String.Format(SummaryHoursNew, experienceType))).Wait(WebDriver, 3).Text.Replace(" Months", "");
            int.TryParse(expectedValueString, out expectedTotalSummaryValues);
            int totalMonths = actualCourseMonths1 + actualCourseMonths2;
            totalMonths.Should().BeGreaterOrEqualTo(expectedTotalSummaryValues);
            WebDriver.FindElement(By.XPath(String.Format(SummaryHoursNew, experienceType))).GetCssValue("color").Should().Equals("rgba(67, 168, 62, 1)");
            _wait.Until(_ => ContinueToPortfolioExperienceEnabled());
            return this;
        }

        private bool ExpBreadCrumbDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => ExperienceBeardCrumb.Displayed && ExperienceBeardCrumb.Enabled, false);
        private bool ExpSummariesBreadCrumbDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => ExperienceSummariesBeardCrumb.Displayed && ExperienceSummariesBeardCrumb.Enabled, false);
        private bool ContinueToExamDetailsClickable() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToExamDetails.Displayed && ContinueToExamDetails.Enabled, false);

        public BusinessExperiencePage ClickAdditionalExperience(TestData testData, String experienceType)
        {
            WebDriver.FindElement(By.XPath(string.Format(AddAdditionalExperienceNew, experienceType))).Wait(WebDriver).Enabled.Should().BeTrue("Add Additional Experience for " + testData.CertType + experienceType + " is not Enabled");
            WebDriver.FindElement(By.XPath(string.Format(AddAdditionalExperienceNew, experienceType))).Wait(WebDriver).Click(true);
            WebDriver.WaitUntilWebElementIsFound(d => d.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))), _userSettings.Timeout);
            WebDriver.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))).Wait(WebDriver).Displayed.Should().BeTrue();
            return this;
        }

        private void AddExperienceDetails(TestData testData, String experienceType)
        {
            testData.ProjectDescription = ProjectDescriptionText;
            _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));

            //Assiginig additional experience test data into existing experience data
            if (AddExperienceCount > 0)
            {
                testData.ProjectStartMonth = testData.ProjectStartMonth1;
                testData.ProjectStartYear = testData.ProjectStartYear1;
                testData.ProjectEndMonth = testData.ProjectEndMonth1;
                testData.ProjectEndYear = testData.ProjectEndYear1;
            }

            try
            {
                WebDriver.WaitUntilWebElementIsFound(d => ExperienceHeading, _userSettings.Timeout);
                Thread.Sleep(3000);
                //Project Title
                _wait.Until(_ => Extensions.Extensions.CatchUnavailableElement(() => WebDriver.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))).Displayed, false));
                WebDriver.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))).Wait(WebDriver).ActionClick(WebDriver);
                WebDriver.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))).Wait(WebDriver).SendKeys(testData.ProjectTitle);
                //Organization
                WebDriver.FindElement(By.XPath(string.Format(OrganizationNew, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(OrganizationNew, experienceType))).Wait(WebDriver).SendKeys(testData.Organization);
                //Job Title
                WebDriver.FindElement(By.XPath(string.Format(JobTitleNew, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(JobTitleNew, experienceType))).Wait(WebDriver).SendKeys(testData.JobTitle);
                //Functional Reporting Area
                if (!(testData.CertType.ToUpper().Equals(CertificationType.CPBEP) && experienceType.Equals(ExperienceType.ConstructionExperience)))
                {
                    WebDriver.FindElement(By.XPath(string.Format(FunctionalReportingAreaNew, experienceType))).Wait(WebDriver).Click();
                    Thread.Sleep(2000);
                    WebDriver.FindElement(By.XPath(string.Format(FunctionalReportingAreaListNew, experienceType, testData.FunctionalReportingArea))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
                    if (testData.FunctionalReportingArea.Equals("Other"))
                        WebDriver.FindElement(By.XPath(string.Format(OtherFunctionalReportingArea, experienceType))).Wait(WebDriver, 1).SendKeys(testData.FunctionalReportingArea);
                }
                //Organization Primary Focus
                if (!(testData.CertType.ToUpper().Equals(CertificationType.CPBEP) && experienceType.Equals(ExperienceType.ConstructionExperience)))
                {
                    WebDriver.FindElement(By.XPath(string.Format(OrganizationPrimaryFocusNew, experienceType))).Wait(WebDriver).Click();
                    Thread.Sleep(2000);
                    WebDriver.FindElement(By.XPath(string.Format(OrganizationPrimaryFocusListNew, experienceType, testData.OrganizationPrimaryFocus))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
                    if (testData.OrganizationPrimaryFocus.Equals("Other"))
                        WebDriver.FindElement(By.XPath(string.Format(OtherOrganizationPrimaryFocus, experienceType))).Wait(WebDriver, 1).SendKeys(testData.OrganizationPrimaryFocus);
                }
                //Project Start Date
                WebDriver.FindElement(By.XPath(string.Format(StartMonth, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(ProjectStartDateMonthList, experienceType, testData.ProjectStartMonth))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
                WebDriver.FindElement(By.XPath(string.Format(StartYear, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(ProjectStartDateYearList, experienceType, testData.ProjectStartYear))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
                //Project End Date
                WebDriver.FindElement(By.XPath(string.Format(EndMonth, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(ProjectEndDateMonthList, experienceType, testData.ProjectEndMonth))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
                WebDriver.FindElement(By.XPath(string.Format(EndYear, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(ProjectEndDateYearList, experienceType, testData.ProjectEndYear))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
            }
            catch (Exception _exception)
            {
                Console.WriteLine(_exception);
            }
        }

        public BusinessExperiencePage EditProfessionalExperience(TestData testData, String experienceType)
        {
            EditExperience.Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);
            WebDriver.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))).SendKeys(Keys.Control + "a");
            WebDriver.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))).SendKeys(Keys.Delete);
            WebDriver.FindElement(By.XPath(string.Format(ProjectTitleNew, experienceType))).Wait(WebDriver).SendKeys(testData.ProjectTitle);

            WebDriver.FindElement(By.XPath(string.Format(SaveExperienceButtonNew, experienceType))).Wait(WebDriver, 3).ActionClick(WebDriver);
            _wait.Until(_ => !SaveExperienceBtnVisible(experienceType));
            Thread.Sleep(6000);
            _wait.Until(_ => ContinueToExamDetailsClickable());
            return this;
        }

        private bool RemoveExperienceDisplayed(String experienceType) => Extensions.Extensions.CatchUnavailableElement((Func<bool>)(() => (bool)(this.WebDriver.FindElement(By.XPath(String.Format(RemoveExperienceNew, experienceType))).Displayed && this.WebDriver.FindElement(By.XPath(String.Format(RemoveExperienceNew, experienceType))).Enabled)), false);
        private bool RemoveExperienceInPopUpDisplayed() => Extensions.Extensions.CatchUnavailableElement((Func<bool>)(() => (bool)(this.RemoveExperienceInPopUp.Displayed && this.RemoveExperienceInPopUp.Enabled)), false);


        public BusinessExperiencePage RemoveExperienceDetails(String experienceType)
        {
            var totalWait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            totalWait.Until(
                (Func<IWebDriver, bool>)(d =>
                {
                    try
                    {
                        if (RemoveExperienceDisplayed(experienceType))
                        {
                            RemoveExperience.ScrollToElement(WebDriver).ActionClick(WebDriver);
                            if (RemoveExperienceInPopUpDisplayed())
                            {
                                RemoveExperienceInPopUp.ScrollToElement(WebDriver).ActionClick(WebDriver);
                            }
                        }
                        VerifyPageLoaded();
                        return !RemoveExperienceDisplayed(experienceType);
                    }
                    catch (Exception)
                    {
                        return true;
                    }
                }));
            return this;
        }

        private bool AddAdditionalExperienceClickable(String experienceType) => Extensions.Extensions.CatchUnavailableElement(() => this.WebDriver.FindElement(By.XPath(string.Format(AddAdditionalExperienceNew, experienceType))).Displayed && WebDriver.FindElement(By.XPath(string.Format(AddAdditionalExperienceNew, experienceType))).Enabled, false);

        public BusinessExperiencePage AdditionalExperience(String experienceType)
        {
            if (AddAdditionalExperienceClickable(experienceType))
            {
                _wait.Until(_ => AddAdditionalExperienceClickable(experienceType));
                WebDriver.FindElement(By.XPath(string.Format(AddAdditionalExperienceNew, experienceType))).Wait(WebDriver, 2).ActionClick(WebDriver);
                AddExperienceCount = AddExperienceCount + 1;
            }
            return this;
        }

        private bool ContinueToPortfolioExperience() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToPortfolioExp.Displayed && ContinueToPortfolioExp.Enabled, false);

        public BusinessExperiencePage VerifyAndClickContinueToBusinessExperience()
        {
            _wait.Until(_ => ContinueToPortfolioExperience());
            ContinueToPortfolioExp.Wait(WebDriver, 5).ActionClick(WebDriver);
            WebDriver.WaitForLoaderInvisible();
            _wait.Until(_ => !ContinueToPortfolioExperience());
            WebDriver.WaitUntilWebElementIsFound(d => ExperienceHeading, _userSettings.Timeout);
            return this;
        }
    }
}