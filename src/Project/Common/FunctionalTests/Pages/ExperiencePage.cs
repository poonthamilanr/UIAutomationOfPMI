#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using FluentAssertions;
    using NUnit.Framework;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Interactions;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Certification.Functional.Tests.Extensions;
    using Pmi.Certification.Functional.Tests.Hooks;
    using Pmi.Web.Ui.Framework.Extensions;
    using Pmi.Web.Ui.Framework.Page;
    public class ExperiencePage : BasePage<ExperiencePage>
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
            "management objectives are detrimental to decision making. A project is a temporary and unique endeavor designed to produce a product, service, or result with a defined beginning " +
            "and end undertaken to meet unique goals and objectives, typically to bring about beneficial change or added value. The temporary nature of projects stands in contrast with business " +
            "as usual. In practice, the management of such distinct production approaches requires the development of distinct technical skills and management strategies. Different approaches to " +
            "project management are Benefits realization management, Critical path method, Critical chain project management, Earned value management, Iterative and incremental project management, " +
            "Lean project management, Process-based management, Project production management, Product-based planning.";

        public ExperiencePage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            VerifyPageLoaded();
        }

        private static By PmiLogo => By.XPath("//header[@class='dsm app-header']//a");
        public override string BaseUrl => _userSettings.BaseUrl;

        private IWebElement ExperienceHeading => WebDriver.FindElement(By.XPath("//div/h2[contains(text(),'Experience')]"));
        private IWebElement ProjectTitle => WebDriver.FindElement(By.XPath("//input[@id='projectTitle_input']"));
        private IWebElement Organization => WebDriver.FindElement(By.Id("company_input"));
        private IWebElement JobTitle => WebDriver.FindElement(By.Id("jobTitle_input"));
        private IWebElement FunctionalReportingArea => WebDriver.FindElement(By.XPath("//label[@for='functionalAreaTypeEnum_select']/following-sibling::div"));
        private IWebElement FunctionalReportingAreaOther => WebDriver.FindElement(By.XPath("//label[@for='functionalAreaTypeEnum_select']/following-sibling::div/div/input"));
        private IWebElement OrganizationPrimaryFocus => WebDriver.FindElement(By.XPath("//label[@for='primaryFocusTypeEnum_select']/following-sibling::div"));
        private IWebElement OrganizationPrimaryFocusOther => WebDriver.FindElement(By.XPath("//label[@for='primaryFocusTypeEnum_select']/following-sibling::div/div/input"));
        private IWebElement ApproachOrMethodology => WebDriver.FindElement(By.XPath("//label[@for='methodologyEnum_select']/following-sibling::div/div"));
        private IWebElement ProjectTeamSize => WebDriver.FindElement(By.XPath("//label[@for='teamSizeEnum_select']/following-sibling::div/div"));
        private IWebElement ProjectBudget => WebDriver.FindElement(By.XPath("//label[@for='budgetRangeEnum_select']/following-sibling::div/div[contains(@class,'p-dropdown')]"));
        private IWebElement ProjectDescription => WebDriver.FindElement(By.Id("description_textArea"));
        private IWebElement ProjectDatesStartMonth => WebDriver.FindElement(By.XPath("//div[@class='dates-period__divider']/preceding-sibling::div/child::div[1]/div[@role='button']"));
        private IWebElement ProjectDatesStartYear => WebDriver.FindElement(By.XPath("//div[@class='dates-period__divider']/preceding-sibling::div/child::div[2]/div[@role='button']"));
        private IWebElement ProjectDatesEndMonth => WebDriver.FindElement(By.XPath("//div[@class='dates-period__divider']/following-sibling::div/child::div[1]/div[@role='button']"));
        private IWebElement ProjectDatesEndYear => WebDriver.FindElement(By.XPath("//div[@class='dates-period__divider']/following-sibling::div/child::div[2]/div[@role='button']"));
        private IWebElement InProgress => WebDriver.FindElement(By.XPath("//label[contains(@id,'startDate-endDate-in-progress')]/preceding-sibling::div/div/span"));
        private IWebElement SaveExperience => WebDriver.FindElement(By.XPath("//button[text()='Save Experience']"));
        private IWebElement BusinessAnalysisExperienceHeading => WebDriver.FindElement(By.XPath("//div/h2[text()='Business Analysis Experience']"));
        private IWebElement ExperienceHeadingValue => WebDriver.FindElement(By.XPath("//div[contains(@class , 'experience__header')]/span"));
        public IList<IWebElement> _experienceSectionValues => WebDriver.FindElements(By.XPath("//div[@class = 'experience-property__value']"));
        private IWebElement RemoveExperience => WebDriver.FindElement(By.XPath("(//div[@class='experience__buttons']/a[text()='Remove Experience'])[1]"));
        private IWebElement RemoveExperienceInPopUp => WebDriver.FindElement(By.XPath("//button[text()='Remove Experience']"));
        private IWebElement TotalSummaryHours => WebDriver.FindElement(By.XPath("//div[@class='summary__hours']"));
        private IWebElement EditExperience => WebDriver.FindElement(By.XPath("//div[@class='experience__buttons']/a[text()='Edit Experience']"));
        private IWebElement CancelExperienceEditing => WebDriver.FindElement(By.XPath("//button[text()='Cancel']"));
        private IWebElement ContinueToExamDetails => WebDriver.FindElement(By.XPath("//button[text()='Continue To Exam Details']"));

        private IWebElement AddAdditionalExperience => WebDriver.FindElement(By.XPath("//button[contains(text(),'Add Additional Experience')]"));
        private IWebElement GACMonths => WebDriver.FindElement(By.XPath("//div[text() = 'GAC Credit']/following-sibling::div"));
        private IWebElement GACCredit => WebDriver.FindElement(By.XPath("//div[text() = 'GAC Credit']"));
        internal IList<IWebElement> ExperienceSummaryCourseValues => WebDriver.FindElements(By.XPath("//div[@class = 'summary__course-line']/div"));
        private IWebElement ExamDetailsHeaderText => WebDriver.FindElement(By.XPath("//div[@class = 'heading']/h2"));
        private IWebElement ExperienceBeardCrumb => WebDriver.FindElement(By.XPath("//ul[contains(@class, 'breadcrumbs')]/li[contains(@class, 'breadcrumbs__item_passed')]//span[contains(text(), 'Experience')]"));

        private IWebElement FunctionalReportAreaDDList => WebDriver.FindElement(By.XPath("//label[@for='functionalAreaTypeEnum_select']/following-sibling::div/div//ul/li"));
        private IWebElement OrganizationPrimaryFocusDDList => WebDriver.FindElement(By.XPath("//label[@for='primaryFocusTypeEnum_select']/following-sibling::div/div//ul/li"));
        private IWebElement ApproachMethodDDList => WebDriver.FindElement(By.XPath("//label[@for='methodologyEnum_select']/following-sibling::div/div//ul/li"));
        private IWebElement ProjectTeamSizeDDList => WebDriver.FindElement(By.XPath("//label[@for='teamSizeEnum_select']/following-sibling::div/div//ul/li"));
        private IWebElement ProjectBudgetDDList => WebDriver.FindElement(By.XPath("//label[@for='budgetRangeEnum_select']/following-sibling::div/div//ul/li"));
        private IWebElement ProjectDatesStartMonthDDList => WebDriver.FindElement(By.XPath("//div[@class='dates-period__divider']/preceding-sibling::div/child::div[1]/div//ul/li"));
        private IWebElement ProjectDatesStartYearDDList => WebDriver.FindElement(By.XPath("//div[@class='dates-period__divider']/preceding-sibling::div/child::div[2]/div//ul/li"));
        private IWebElement ProjectDatesEndMonthDDList => WebDriver.FindElement(By.XPath("//div[@class='dates-period__divider']/following-sibling::div/child::div[1]/div//ul/li"));
        private IWebElement ProjectDatesEndYearDDList => WebDriver.FindElement(By.XPath("//div[@class='dates-period__divider']/following-sibling::div/child::div[2]/div//ul/li"));
        private IWebElement ContinueToExperienceSummaries => WebDriver.FindElement(By.XPath("//button[contains(text(),'Continue To Experience Summaries')]"));
        private IWebElement ExperienceSummariesHeaderTest => WebDriver.FindElement(By.XPath("//h2[contains(text(),'Experience Summaries')]"));
        private IWebElement ExperienceSummariesBeardCrumb => WebDriver.FindElement(By.XPath("//ul[@class = 'breadcrumbs']/li[@class='breadcrumbs__item breadcrumbs__item_passed']//span[text()='Experience Summaries']"));
        private IWebElement PgMPaddProjectButton => WebDriver.FindElement(By.XPath("//button[text() = 'Next: Add Projects']"));
        private IWebElement ProgramProjectSaveButton => WebDriver.FindElement(By.CssSelector("div.experience-program form.experience-program__projects-form button"));
        private IWebElement ProgramSaveButton => WebDriver.FindElement(By.XPath("//div[@class='experience-program__projects-buttons']//button[text()='Save Program']"));

        private IWebElement AddProjectsToYourProgramText => WebDriver.FindElement(By.XPath("//h2[text() = 'Add Projects to your Program']"));
        private IWebElement AddExperienceButton => WebDriver.FindElement(By.XPath("//a[contains(text(),'Additional Experience')]"));
        private static string ProgramProjectTitle => "(//h2[text() = 'Add Projects to your Program']/parent::div/following-sibling::form)[{0}]//input[@id = 'projectTitle_input']";
        private static string ProgramApproachMethodology => "(//h2[text() = 'Add Projects to your Program']/parent::div/following-sibling::form)[{0}]//label[@for='methodologyEnum_select']/following-sibling::div";
        private static string ProgramTeamSize => "(//h2[text() = 'Add Projects to your Program']/parent::div/following-sibling::form)[{0}]//label[@for='teamSizeEnum_select']/following-sibling::div";
        private static string ProgramBudget => "(//h2[text() = 'Add Projects to your Program']/parent::div/following-sibling::form)[{0}]//label[@for='budgetRangeEnum_select']/following-sibling::div/div/following-sibling::div";
        private static string ProgramStartMonth => "(//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form)[{0}]//div[@class='dates-period__divider']/preceding-sibling::div/child::div[1]/div[@role='button']";
        private static string ProgramStartYear => "(//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form)[{0}]//div[@class='dates-period__divider']/preceding-sibling::div/child::div[2]/div[@role='button']";
        private static string ProgramEndMonth => "(//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form)[{0}]//div[@class='dates-period__divider']/following-sibling::div/child::div[1]/div[@role='button']";
        private static string ProgramEndYear => "(//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form)[{0}]//div[@class='dates-period__divider']/following-sibling::div/child::div[2]/div[@role='button']";
        private By ContinueToExperienceSummaryButton => By.XPath("//button[contains(text(),'Continue To Experience Summaries')]");
        private By ProgramProjectEditButton => By.XPath("//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::div//a[text()='Edit']");
        private By ProgramProjectCancelButton => By.XPath("//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form[1]//button[text()='Cancel']");
        private By ProgramProjectSaveProgramButton => By.XPath("//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form[1]//button[text()='Save Project']");

        //New ExperiencePageLocators
        private static string ProjectTitleNew => "//h2[text()='{0}']//parent::div//following-sibling::form//input[@id='projectTitle_input']";
        private static string OrganizationNew => "//h2[text()='{0}']//parent::div//following-sibling::form//input[@id='company_input']";
        private static string JobTitleNew => "//h2[text()='{0}']//parent::div//following-sibling::form//input[@id='jobTitle_input']";
        private static string FunctionalReportingAreaNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='functionalAreaTypeEnum_select']/following-sibling::div";
        private static string OrganizationPrimaryFocusNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='primaryFocusTypeEnum_select']/following-sibling::div";
        private static string ProjectTeamSizeNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='teamSizeEnum_select']/following-sibling::div";
        private static string AgileMethod => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='agileMethodologyEnum_multi-select']//following-sibling::div";
        private static string StartMonth => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/preceding-sibling::div/child::div[1]/div[@role='button']";
        private static string StartYear => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/preceding-sibling::div/child::div[2]/div[@role='button']";
        private static string EndMonth => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/following-sibling::div/child::div[1]/div[@role='button']";
        private static string EndYear => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/following-sibling::div/child::div[2]/div[@role='button']";
        private static string ProjectDescriptionNew => "//h2[text()='{0}']//parent::div//following-sibling::form//textarea[@id='description_textArea']";
        private static string ProjectBudgetNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='budgetRangeEnum_select']/following-sibling::div/div/following-sibling::div";
        private static string ApproachOrMethodologyNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='methodologyEnum_select']/following-sibling::div";
        private static string FunctionalReportingAreaListNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='functionalAreaTypeEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string OrganizationPrimaryFocusListNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='primaryFocusTypeEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string ApproachOrMethodologyListNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='methodologyEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string ProjectTeamSizeListNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='teamSizeEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string ProjectBudgetListNew => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='budgetRangeEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string ProjectStartDateMonthList => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/preceding-sibling::div/child::div[1]/div//ul/li[text()='{1}']";
        private static string ProjectStartDateYearList => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/preceding-sibling::div/child::div[2]/div//ul/li[text()='{1}']";
        private static string ProjectEndDateMonthList => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/following-sibling::div/child::div[1]/div//ul/li[text()='{1}']";
        private static string ProjectEndDateYearList => "//h2[text()='{0}']//parent::div//following-sibling::form//div[@class='dates-period__divider']/following-sibling::div/child::div[2]/div//ul/li[text()='{1}']";
        private static string SaveExperienceButtonNew => "//h2[text()='{0}']//parent::div//following-sibling::form//button[contains(text(),'Save')]";
        private static string EditExperienceNew => "//h2[contains(text(), '{0}')]//parent::div//following-sibling::div//a[text()='Edit Experience']";
        private static string RemoveExperienceNew => "//h2[contains(text(), '{0}')]//parent::div//following-sibling::div//a[text()='Remove Experience']";
        private static string CancelExperienceNew => "//h2[text()='{0}']//parent::div//following-sibling::form//button[contains(text(),'Cancel')]";
        private static string AddAdditionalExperienceNew => "//h2[text()='{0}']//parent::div/following-sibling::div/following-sibling::a[contains(text(), 'Additional')]";
        private static string SummaryHoursNew => "//h2[text()='{0}']//parent::div//parent::div//following-sibling::div//div[@class='summary__hours']";
        private static string ExperienceHeadingValueNew => "//h2[contains(text(), '{0}')]//parent::div//following-sibling::div//div[contains(@class , 'experience__header')]/span";
        private static string ExperienceSectionValuesNew => "//h2[contains(text(), '{0}')]//parent::div//following-sibling::div//div[@class = 'experience-property__value']";
        private static string ExperienceSummaryCourseValuesNew => "//h2[contains(text(), '{0}')]//parent::div//parent::div//following-sibling::div//div[@class = 'summary__course-line']/div";
        private static string AgileMethodologyList => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='agileMethodologyEnum_multi-select']/following-sibling::div//div[@class='p-autocomplete-panel p-component p-connected-overlay-enter-done']//li[text()='{1}']";
        private static string NumberOfProjects => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='portfolioCount_input']/following-sibling::input";
        private static string NumberOfDirectReports => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='directReports_input']/following-sibling::input";
        private static string DirectReports => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='pmReports_input']/following-sibling::input";
        private static string ProgramApproachMethodologyList => "(//h2[text() = 'Add Projects to your Program']/parent::div/following-sibling::form)[{0}]//label[@for='methodologyEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string ProgramTeamSizeList => "(//h2[text() = 'Add Projects to your Program']/parent::div/following-sibling::form)[{0}]//label[@for='teamSizeEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string ProgramBudgetList => "(//h2[text() = 'Add Projects to your Program']/parent::div/following-sibling::form)[{0}]//label[@for='budgetRangeEnum_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{1}']";
        private static string ProgramProjectStartDateMonthList => "(//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form)[{0}]//div[@class='dates-period__divider']/preceding-sibling::div/child::div[1]/div//ul/li[text()='{1}']";
        private static string ProgramProjectStartDateYearList => "(//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form)[{0}]//div[@class='dates-period__divider']/preceding-sibling::div/child::div[2]/div//ul/li[text()='{1}']";
        private static string ProgramProjectEndDateMonthList => "(//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form)[{0}]//div[@class='dates-period__divider']/following-sibling::div/child::div[1]/div//ul/li[text()='{1}']";
        private static string ProgramProjectEndDateYearList => "(//h2[text() = 'Add Projects to your Program']//parent::div//following-sibling::form)[{0}]//div[@class='dates-period__divider']/following-sibling::div/child::div[2]/div//ul/li[text()='{1}']";
        private static string OtherOrganizationPrimaryFocus => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='primaryFocusTypeEnum_select']/following-sibling::div//input";
        private static string OtherFunctionalReportingArea => "//h2[text()='{0}']//parent::div//following-sibling::form//label[@for='functionalAreaTypeEnum_select']/following-sibling::div//input";

        private static string PMPBadge => "//h2[text()='{0}']//parent::div/following-sibling::div[contains(@class, 'requirements-badge')]/div";
        public ExperiencePage VerifyPmiLogo()
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

        public ExperiencePage FillExperienceDetails(TestData testData, String experienceType)
        {
            Thread.Sleep(5000);
            AddExperienceDetails(testData, experienceType);
            //Approach Or Methodology
            if ((testData.CertType.ToUpper().Equals(CertificationType.ACP) & experienceType.Equals(ExperienceType.ProjectExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.ACP) & experienceType.Equals(ExperienceType.GeneralExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.PBA) & experienceType.Equals(ExperienceType.BusinesAnalysisExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.PMP) & experienceType.Equals(ExperienceType.Experience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.PgMP) & experienceType.Equals(ExperienceType.ProjectExperience))
                )
            {
                WebDriver.FindElement(By.XPath(string.Format(ApproachOrMethodologyNew, experienceType))).Wait(WebDriver, 2).Click();
                Thread.Sleep(2000);
                WebDriver.FindElement(By.XPath(string.Format(ApproachOrMethodologyListNew, experienceType, testData.Approach))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
            }
            //Project Team Size
            if ((testData.CertType.ToUpper().Equals(CertificationType.ACP) & experienceType.Equals(ExperienceType.ProjectExperience)) ||
               (testData.CertType.ToUpper().Equals(CertificationType.ACP) & (experienceType.Equals(ExperienceType.GeneralExperience) | experienceType.Equals(ExperienceType.AgileExperience))) ||
               (testData.CertType.ToUpper().Equals(CertificationType.PMP) & experienceType.Equals(ExperienceType.Experience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.PgMP) & experienceType.Equals(ExperienceType.ProjectExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.DAVSC) & experienceType.Equals(ExperienceType.AgileExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.DAC) & experienceType.Equals(ExperienceType.AgileCoachingExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.DASSM) & experienceType.Equals(ExperienceType.AgileExperience)))
            {
                WebDriver.FindElement(By.XPath(string.Format(ProjectTeamSizeNew, experienceType))).Wait(WebDriver, 1).Click();
                Thread.Sleep(2000);
                WebDriver.FindElement(By.XPath(string.Format(ProjectTeamSizeListNew, experienceType, testData.ProjectTeamSize))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
            }
            //Project Budget
            if ((testData.CertType.ToUpper().Equals(CertificationType.PgMP) & (experienceType.Equals(ExperienceType.ProgramExperience) | experienceType.Equals(ExperienceType.ProjectExperience))) ||
               (testData.CertType.ToUpper().Equals(CertificationType.ACP) & experienceType.Equals(ExperienceType.GeneralExperience)) ||
               (testData.CertType.ToUpper().Equals(CertificationType.PMP) & experienceType.Equals(ExperienceType.Experience)) ||
               (testData.CertType.ToUpper().Equals(CertificationType.PfMP) & experienceType.Equals(ExperienceType.PortfolioExperience)))
            {
                WebDriver.FindElement(By.XPath(string.Format(ProjectBudgetNew, experienceType))).Wait(WebDriver).Click();
                Thread.Sleep(2000);
                WebDriver.FindElement(By.XPath(string.Format(ProjectBudgetListNew, experienceType, testData.ProjectBudget))).Wait(WebDriver, 1).ScrollToElement(WebDriver).Click(true);
            }
            //Agile Methodology
            if ((testData.CertType.ToUpper().Equals(CertificationType.ACP) & experienceType.Equals(ExperienceType.AgileExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.DAVSC) & experienceType.Equals(ExperienceType.AgileExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.DAC) & experienceType.Equals(ExperienceType.AgileCoachingExperience)) ||
                (testData.CertType.ToUpper().Equals(CertificationType.DASSM) & experienceType.Equals(ExperienceType.AgileExperience)))
            {
                Actions ac = new Actions(WebDriver);
                ac.DoubleClick(WebDriver.FindElement(By.XPath(string.Format(AgileMethod, experienceType))).Wait(WebDriver)).Perform();
                ac.SendKeys(WebDriver.FindElement(By.XPath(string.Format(AgileMethod, experienceType))), testData.AgileMethodology).Perform();
                Thread.Sleep(2000);
                WebDriver.FindElement(By.XPath(string.Format(AgileMethodologyList, experienceType, testData.AgileMethodology))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            }
            //Number Of Projects Portfolios
            if ((testData.CertType.ToUpper().Equals(CertificationType.PfMP) & experienceType.Equals(ExperienceType.PortfolioExperience)))
            {
                WebDriver.FindElement(By.XPath(string.Format(NumberOfProjects, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(NumberOfProjects, experienceType))).Wait(WebDriver).SendKeys(testData.ProjectPortfolios);
            }
            //Number Of Direct Reports and Direct Reporters for PMI
            if ((testData.CertType.ToUpper().Equals(CertificationType.PgMP) & experienceType.Equals(ExperienceType.ProgramExperience)))
            {
                WebDriver.FindElement(By.XPath(string.Format(NumberOfDirectReports, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(NumberOfDirectReports, experienceType))).Wait(WebDriver).SendKeys(testData.DirectReports);
                WebDriver.FindElement(By.XPath(string.Format(DirectReports, experienceType))).Wait(WebDriver).Click();
                WebDriver.FindElement(By.XPath(string.Format(DirectReports, experienceType))).Wait(WebDriver).SendKeys(testData.DirectReportsPM);
            }
            //Add Projects Details
            if ((testData.CertType.ToUpper().Equals(CertificationType.PgMP) & experienceType.Equals(ExperienceType.ProgramExperience)))
            {
                var projectDetails1 = new Dictionary<string, string> { { "StartMonth", testData.ProgramProjectStartMonth1 }, { "StartYear", testData.ProgramProjectStartYear1 }, { "EndMonth", testData.ProgramProjectEndMonth1 }, { "EndYear", testData.ProgramProjectEndYear1 } };
                var projectDetails2 = new Dictionary<string, string> { { "StartMonth", testData.ProgramProjectStartMonth2 }, { "StartYear", testData.ProgramProjectStartYear2 }, { "EndMonth", testData.ProgramProjectEndMonth2 }, { "EndYear", testData.ProgramProjectEndYear2 } };
                PgMPaddProjectButton.Wait(WebDriver).Enabled.Should().BeTrue();
                PgMPaddProjectButton.Wait(WebDriver).Click(true);
                AddProjectToYourProgramDetails(testData, projectDetails1, "1");
                Thread.Sleep(5000);
                WebDriver.WaitUntilWebElementIsFound(d => d.FindElement(ProgramProjectEditButton), _userSettings.Timeout);
                WebDriver.FindElement(ProgramProjectEditButton).Displayed.Should().BeTrue();

                AddProjectToYourProgramDetails(testData, projectDetails2, "1");
                WebDriver.WaitUntilWebElementIsFound(d => d.FindElement(ProgramProjectEditButton), _userSettings.Timeout);
                WebDriver.FindElement(ProgramProjectEditButton).Displayed.Should().BeTrue();
                WebDriver.FindElements(ProgramProjectEditButton).Count().Should().BeGreaterThan(1);
            }
            //Save Program
            if ((testData.CertType.ToUpper().Equals(CertificationType.PgMP) & experienceType.Equals(ExperienceType.ProgramExperience)))
            {
                ProgramSaveButton.Displayed.Should().BeTrue();
                ProgramSaveButton.Enabled.Should().BeTrue();
                ProgramSaveButton.Wait(WebDriver, 2).Click(true);
            }
            else
            {
                WebDriver.FindElement(By.XPath(string.Format(SaveExperienceButtonNew, experienceType))).Wait(WebDriver, 5).ActionClick(WebDriver);
                _wait.Until(_ => !SaveExperienceBtnVisible(experienceType));
            }
            Thread.Sleep(3000);

            return this;
        }

        private bool SaveExperienceBtnVisible(string experienceType)
        {
            return Extensions.Extensions.CatchUnavailableElement(() => WebDriver.FindElement(By.XPath(string.Format(SaveExperienceButtonNew, experienceType))).Displayed &&
                WebDriver.FindElement(By.XPath(string.Format(SaveExperienceButtonNew, experienceType))).Enabled, false);
        }
        public ExperiencePage VerifyExperienceDetails(TestData testData, String experienceType)
        {
            try
            {
                var expectedProjectExperienceDetails = new List<string>
                {
                testData.Organization,
                testData.JobTitle,
                testData.FunctionalReportingArea,
                testData.OrganizationPrimaryFocus,
                testData.Approach,
                testData.AgileMethodology,
                testData.ProjectTeamSize,
                testData.ProjectBudget,
                testData.DirectReports,
                testData.DirectReportsPM,
                testData.ProjectPortfolios,
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
                        Console.WriteLine("The actual experience value '" + actualListValue + "' is not met with expected experience value");
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

        private bool ExamDetailsEnabled() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToExamDetails.Displayed && ContinueToExamDetails.Enabled, false);

        private bool ExperienceSummariesEnabled() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToExperienceSummaries.Displayed && ContinueToExperienceSummaries.Enabled, false);

        public ExperiencePage VerifyExperienceSummaryDetails(TestData _testData, string experienceType)
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
            if (_testData.CertType.ToUpper().Equals(CertificationType.PMP) || _testData.CertType.ToUpper().Equals(CertificationType.RMP) ||
                    _testData.CertType.ToUpper().Equals(CertificationType.SP) || _testData.CertType.ToUpper().Equals(CertificationType.ACP) ||
                    _testData.CertType.ToUpper().Equals(CertificationType.PBA) || _testData.CertType.ToUpper().Equals(CertificationType.DAVSC) ||
                    _testData.CertType.ToUpper().Equals(CertificationType.DAC) || _testData.CertType.ToUpper().Equals(CertificationType.DASSM))
            {
                ExamDetailsEnabled();
            }
            else
            {
                ExperienceSummariesEnabled();
            }
            return this;
        }

        private bool ExpBreadCrumbDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => ExperienceBeardCrumb.Displayed && ExperienceBeardCrumb.Enabled, false);
        private bool ExpSummariesBreadCrumbDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => ExperienceSummariesBeardCrumb.Displayed && ExperienceSummariesBeardCrumb.Enabled, false);
        private bool ContinueToExamDetailsClickable() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToExamDetails.Displayed && ContinueToExamDetails.Enabled, false);
        public ExperiencePage VerifyAndClickContinueToExamDetails(TestData testData)
        {
            _wait.Until(_ => ContinueToExamDetailsClickable());
            ContinueToExamDetails.Enabled.Should().BeTrue("Continue To Exam Details is not Enabled");
            ContinueToExamDetails.Wait(WebDriver, 5).ScrollToElement(WebDriver).WaitForSteadiness(WebDriver, 5).ActionClick(WebDriver);
            WebDriver.WaitForLoaderInvisible();
            _wait.Until(_ => !ContinueToExamDetailsClickable());
            if (!testData.CertType.ToUpper().Equals(CertificationType.PgMP) || !testData.CertType.ToUpper().Equals(CertificationType.PfMP))
            {
                WebDriver.WaitUntilWebElementIsFound(d => ExamDetailsHeaderText, _userSettings.Timeout);
                _wait.Until(_ => ExpBreadCrumbDisplayed());
            }
            else
            {
                WebDriver.WaitUntilWebElementIsFound(d => ExperienceSummariesHeaderTest, _userSettings.Timeout);
                _wait.Until(_ => ExpSummariesBreadCrumbDisplayed());
            }
            return this;
        }

        private bool ContinueToExamSummariesDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToExperienceSummaries.Displayed && ContinueToExperienceSummaries.Enabled, false);

        public ExperiencePage VerifyAndClickContinueToExperienceSummary()
        {
            _wait.Until(_ => ContinueToExamSummariesDisplayed());
            ContinueToExperienceSummaries.Enabled.Should().BeTrue("Continue To Experience Summaries is not Enabled");
            ContinueToExperienceSummaries.Wait(WebDriver).ScrollToElement(WebDriver).WaitForSteadiness(WebDriver).ActionClick(WebDriver);
            WebDriver.WaitForLoaderInvisible();
            _wait.Until(_ => !ContinueToExamSummariesDisplayed());
            WebDriver.WaitUntilWebElementIsFound(d => ExperienceSummariesHeaderTest, _userSettings.Timeout);
            ExperienceBeardCrumb.Wait(WebDriver, 10).Displayed.Should().BeTrue("Experience Beard Crumb is not Displayed");
            return this;
        }

        public ExperiencePage ClickAdditionalExperience(TestData testData, String experienceType)
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
                //Project Description
                if (!(testData.CertType.ToUpper().Equals(CertificationType.PfMP) & experienceType.Equals(ExperienceType.BusinessExperience)))
                {
                    WebDriver.FindElement(By.XPath(string.Format(ProjectDescriptionNew, experienceType))).Wait(WebDriver).Click();
                    WebDriver.FindElement(By.XPath(string.Format(ProjectDescriptionNew, experienceType))).Wait(WebDriver).SendKeys(testData.ProjectDescription);
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

        private void AddProjectToYourProgramDetails(TestData testData, Dictionary<string, string> projectDetails, string formNo)
        {
            _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
            WebDriver.WaitUntilWebElementIsFound(d => AddProjectsToYourProgramText, _userSettings.Timeout);

            //Project Title
            WebDriver.FindElement(By.XPath(string.Format(ProgramProjectTitle, formNo))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProgramProjectTitle, formNo))).Wait(WebDriver).SendKeys(testData.ProjectTitle);

            //Program Project Approach Area
            WebDriver.FindElement(By.XPath(string.Format(ProgramApproachMethodology, formNo, testData.Approach))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProgramApproachMethodologyList, formNo, testData.Approach))).Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);
            //Program Project Team Size
            WebDriver.FindElement(By.XPath(string.Format(ProgramTeamSize, formNo, testData.ProjectTeamSize))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProgramTeamSizeList, formNo, testData.ProjectTeamSize))).Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);
            //Program Project Budget Area
            WebDriver.FindElement(By.XPath(string.Format(ProgramBudget, formNo, testData.ProjectBudget))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProgramBudgetList, formNo, testData.ProjectBudget))).Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);

            //Program Project Start Date
            WebDriver.FindElement(By.XPath(string.Format(ProgramStartMonth, formNo, projectDetails["StartMonth"]))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProgramProjectStartDateMonthList, formNo, projectDetails["StartMonth"]))).Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);
            WebDriver.FindElement(By.XPath(string.Format(ProgramStartYear, formNo, projectDetails["StartYear"]))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProgramProjectStartDateYearList, formNo, projectDetails["StartYear"]))).Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);
            //Program Project End Date
            WebDriver.FindElement(By.XPath(string.Format(ProgramEndMonth, formNo, projectDetails["EndMonth"]))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProgramProjectEndDateMonthList, formNo, projectDetails["EndMonth"]))).Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);
            WebDriver.FindElement(By.XPath(string.Format(ProgramEndYear, formNo, projectDetails["EndYear"]))).Wait(WebDriver).Click();
            WebDriver.FindElement(By.XPath(string.Format(ProgramProjectEndDateYearList, formNo, projectDetails["EndYear"]))).Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);
            //Save Project Button
            Thread.Sleep(3000);
            ProgramProjectSaveButton.WaitForSteadiness(WebDriver, 5).ActionClick(WebDriver);
        }

        public ExperiencePage EditProfessionalExperience(TestData testData, String experienceType)
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


        public ExperiencePage RemoveExperienceDetails(String experienceType)
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

        public ExperiencePage AdditionalExperience(String experienceType)
        {
            if (AddAdditionalExperienceClickable(experienceType))
            {
                _wait.Until(_ => AddAdditionalExperienceClickable(experienceType));
                WebDriver.FindElement(By.XPath(string.Format(AddAdditionalExperienceNew, experienceType))).Wait(WebDriver, 2).ActionClick(WebDriver);
                AddExperienceCount = AddExperienceCount + 1;
            }
            return this;
        }

        private bool PMPBadgeDisplayed(String experienceType) => Extensions.Extensions.CatchUnavailableElement(() => this.WebDriver.FindElement(By.XPath(string.Format(PMPBadge, experienceType))).Displayed && WebDriver.FindElement(By.XPath(string.Format(PMPBadge, experienceType))).Enabled, false);

        public ExperiencePage VerifyPMPBadge(String experienceType)
        {
            _wait.Until(_ => PMPBadgeDisplayed(experienceType));
            switch (experienceType)
            {
                case ExperienceType.ProjectExperience:
                    WebDriver.FindElement(By.XPath(string.Format(PMPBadge, experienceType))).Text.Should().Be("Your PMP certification fulfills the project experience requirements.");
                    break;
                case ExperienceType.GeneralExperience:
                    WebDriver.FindElement(By.XPath(string.Format(PMPBadge, experienceType))).Text.Should().Be("Your PMP certification fulfills the general experience requirements.");
                    break;
            }
            return this;
        }
    }
}