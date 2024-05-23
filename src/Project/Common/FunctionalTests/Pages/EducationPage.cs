#pragma warning disable 649

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

namespace Pmi.Certification.Functional.Tests.Pages
{
    public class EducationPage : BasePage<EducationPage>
    {
        private const string AllListValue = "//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//li[text()='{0}']";
        private const string Country = "//label[@id='schoolCountryCode_select-label']/following-sibling::div//li[text()='{0}']";

        public override string RelativePath => "/";
        protected WebDriverWait _wait;
        private readonly UserSettings _userSettings;

        private IWebElement Body => WebDriver.FindElement(By.XPath("//body"));

        public EducationPage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            base.VerifyPageLoaded();
        }

        public override string BaseUrl => _userSettings.BaseUrl;

        private bool BodyClickable() => Extensions.Extensions.CatchUnavailableElement(() => Body.Displayed && Body.Enabled, false);
        private bool PMILogoDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => _pmiLogo.Displayed && _pmiLogo.Enabled, false);

        public override EducationPage VerifyPageLoaded()
        {
            _wait.Until(_ => BodyClickable());
            _wait.Until(_ => EducationHeadingDisplayed());
            return base.VerifyPageLoaded();
        }

        private IWebElement _pmiLogo =>
               WebDriver.FindElement(By.XPath("//header[@class='dsm app-header']//a"));

        private IWebElement _educationHeading =>
               WebDriver.FindElement(By.XPath("//div/h2[text()='Education']"));

        private IWebElement _educationPage =>
                 WebDriver.FindElement(By.XPath("//title[text()='Education']"));

        public EducationPage VerifyPmiLogo()
        {
            TimeSpan? timeout = _userSettings.Timeout;

            try
            {
                _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
                _wait.Until(_ => PMILogoDisplayed());
            }
            catch (Exception)
            {

            }

            return this;

        }

        private IWebElement HighestLevelEducationBtn =>
                 WebDriver.FindElement(By.XPath("//label[@for = 'degreeEnum_select']/following-sibling::div/div/div[@class='p-dropdown-trigger']/parent::div"));
        private IWebElement HighestLevelEducationList =>
                WebDriver.FindElement(By.XPath("//label[@id='degreeEnum_select-label']/following-sibling::div//div[contains(@class,'p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible')]//ul[contains(@role,'listbox')]"));
        private IWebElement YearsAttendedEndBtn =>
                WebDriver.FindElement(By.XPath("//div[@class='dates-period']//div[3]//div[3]"));
        private IWebElement YearsAttendedEndList =>
                 WebDriver.FindElement(By.XPath("//label[@id='yearStarted-yearOfDegree_period-label']/following-sibling::div//div[contains(@class,'p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible')]//ul[contains(@role,'listbox')]"));
        private IWebElement YearsAttendedStartBtn =>
                 WebDriver.FindElement(By.XPath("//div[@class='dates-period']//div[1]//div[3]"));
        private IWebElement YearsAttendedStartList =>
                 WebDriver.FindElement(By.XPath("//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//div[@class='p-dropdown-items-wrapper']"));
        private IWebElement CountryOfInstitution =>
                 WebDriver.FindElement(By.XPath(".//label[@for = 'schoolCountryCode_select']/following-sibling::div"));
        private IWebElement NameOfInstitution =>
                 WebDriver.FindElement(By.XPath("//input[@role='searchbox']"));
        private IWebElement DegreeProgramSelectionBtn =>
                 WebDriver.FindElement(By.XPath("//div[@class='horizontal-radio__content']//div[@class='form-group']//div//div[@role='button']"));
        private IWebElement DegreeProgramSelectionList =>
                 WebDriver.FindElement(By.XPath("//label[@for='accreditedUniversityDegreeId_select']/following-sibling::div//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//div[@class='p-dropdown-items-wrapper']"));
        private IWebElement DegreeProgram =>
                 WebDriver.FindElement(By.XPath("//label[normalize-space()='Degree Program *']"));
        private IWebElement FieldOfStudySelectionRadio =>
                 WebDriver.FindElement(By.XPath("//span[@class='p-radiobutton-icon p-c']"));
        private IWebElement FieldOfStudySelectionBtn =>
                 WebDriver.FindElement(By.XPath("//div[contains(@class, 'form-group')]/label[@for='fieldOfStudyEnum_select']/following-sibling::div//div[@role='button']"));
        private IWebElement FieldOfStudySelectionList =>
                 WebDriver.FindElement(By.XPath("//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//div[@class='p-dropdown-items-wrapper']"));
        private IWebElement FieldOfStudy =>
                 WebDriver.FindElement(By.XPath(".//label[@for = 'fieldOfStudyEnum_select']/following-sibling::div/span/span"));
        private IWebElement CancelAcademicEducation =>
                 WebDriver.FindElement(By.XPath(".//form[@class = 'edit-mode']//div/button[text() = 'Cancel']"));
        private IWebElement SaveAcademicEducation =>
                 WebDriver.FindElement(By.XPath("//*[text()='Academic Education']/parent::div/following-sibling::form//div/button[text() = 'Save Education']"));
        private IWebElement CourseTitle =>
                 WebDriver.FindElement(By.XPath("//label[contains(text(), 'Course Title')]/parent::div//input"));
        private IWebElement ProviderName =>
                 WebDriver.FindElement(By.XPath("//label[contains(text(), 'Provider Name')]/parent::div//input"));
        private IWebElement CourseDatesStartMonthBtn =>
                 WebDriver.FindElement(By.XPath("//div[@class='dates-period dates-period_months']//div[1]//div[1]//div[3]"));
        private IWebElement CourseDatesStartMonthList =>
                 WebDriver.FindElement(By.XPath("//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//div[@class='p-dropdown-items-wrapper']"));
        private IWebElement QualifyingHours =>
                  WebDriver.FindElement(By.Id("hoursTotal_input"));
        private IWebElement CourseDatesStartYearBtn =>
                  WebDriver.FindElement(By.XPath("//div[@class='dates-period dates-period_months']//div[1]//div[2]//div[3]"));
        private IWebElement CourseDatesStartYearList =>
                  WebDriver.FindElement(By.XPath("//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']"));
        private IWebElement CourseDatesEndMonthBtn =>
                  WebDriver.FindElement(By.XPath("//div[@class='row']//div[3]//div[1]//div[3]"));
        private IWebElement CourseDatesEndMonthList =>
                  WebDriver.FindElement(By.XPath("//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//div[@class='p-dropdown-items-wrapper']"));
        private IWebElement CourseDatesEndYearBtn =>
                  WebDriver.FindElement(By.XPath("//div[@class='row']//div[3]//div[2]//div[3]"));
        private IWebElement CourseDatesEndYearList =>
                  WebDriver.FindElement(By.XPath("//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//div[@class='p-dropdown-items-wrapper']"));
        private IWebElement CancelProfessionalEducation =>
                  WebDriver.FindElement(By.XPath(".(//form[@class = 'edit-mode professional-education']//div/button[text() = 'Cancel'])[1]"));
        private IWebElement SaveProfessionalEducation =>
                  WebDriver.FindElement(By.XPath("//button[text()='Save Education']"));
        private IWebElement AdditionalCoursetitle =>
                  WebDriver.FindElement(By.XPath(".//div[@class = 'form-group form-group--error']/label/following-sibling::input"));
        private IWebElement AdditionalProviderName =>
                  WebDriver.FindElement(By.XPath(".//div[@class = 'form-group form-group--error']/following-sibling::div/label/following-sibling::input[@id = 'institution_input']"));
        private IWebElement AdditionalCourseDateStartMonth =>
                  WebDriver.FindElement(By.XPath(".//div[@class = 'dates-period__divider']/preceding-sibling::div[@class = 'input-group months-period__date-group']//span[text() = 'Month']"));
        private IWebElement AdditionalCourseDateStartYear =>
                  WebDriver.FindElement(By.XPath(".//div[@class = 'dates-period__divider']/preceding-sibling::div[@class = 'input-group months-period__date-group']//span[text() = 'Year']"));
        private IWebElement AdditionalQualifyingHours =>
                  WebDriver.FindElement(By.XPath(".(//input[@id = 'hoursTotal_input'])[2]"));
        private IWebElement CancelAdditionalProfessionalEducation =>
                  WebDriver.FindElement(By.XPath(".(//form[@class = 'edit-mode professional-education']//div/button[text() = 'Cancel'])[2]"));
        private IWebElement aveAdditionalProfessionalEducation =>
                  WebDriver.FindElement(By.XPath(".(//form[@class = 'edit-mode professional-education']//div/button[text() = 'Save Education'])[2]"));
        private IWebElement ContinueToExp =>
                  WebDriver.FindElement(By.XPath("//button[text()='Continue To Experience']"));
        private IWebElement ContinueToProjectExp =>
                  WebDriver.FindElement(By.XPath("//button[text()='Continue To Project Experience']"));
        private IWebElement ContinueToBusinessExp =>
                  WebDriver.FindElement(By.XPath("//button[text()='Continue To Business Experience']"));
        private IWebElement ContinueToProgramExp =>
                  WebDriver.FindElement(By.XPath("//button[text()='Continue To Program Experience']"));
        private IWebElement SidePane =>
                  WebDriver.FindElement(By.XPath(".//span[text() = 'Secondary Degree']"));
        public By _continueExp => By.XPath("//button[text()='Continue To Experience']");

        private IWebElement AddAdditionalEducation =>
                   WebDriver.FindElement(By.XPath("//a[normalize-space()='Add Additional Education']"));
        private IWebElement UpdateProfessionalEducation =>
                  WebDriver.FindElement(By.XPath("//button[normalize-space()='Save Education']"));
        private IWebElement EditProfessionalEducation =>
                  WebDriver.FindElement(By.XPath("//div[@class='professional-education__buttons']//a[@class='with-icon btn-md with-icon link-base btn btn-link'][text()='Edit Education']"));
        private IWebElement UpdateEducation =>
                  WebDriver.FindElement(By.XPath("//button[normalize-space()='Save Education']"));
        private IWebElement EditEducation =>
                  WebDriver.FindElement(By.XPath("//div[@class='academic-education__buttons']//a[@class='with-icon btn-md with-icon link-base btn btn-link']"));
        private IWebElement ProfessionalEducationHeadingValue =>
                  WebDriver.FindElement(By.XPath("//div[@class = 'professional-education-container professional-education__header']"));
        private IWebElement ProfessionalEducationSecValues =>
                  WebDriver.FindElement(By.XPath("//div[@class = 'professional-education-property__value']"));
        private IWebElement RemoveProfessionalEducation =>
                  WebDriver.FindElement(By.XPath("//div[@class='professional-education professional-education_view']//a[1]"));
        private IWebElement AcademicEducationHeading =>
                  WebDriver.FindElement(By.XPath("//div[contains(@class,'academic-education__header')]//span"));
        private IList<IWebElement> AcademicEducationSecValues =>
                  (IList<IWebElement>)WebDriver.FindElement(By.XPath("//div[@class = 'academic-education-property__value']"));
        private IWebElement CapmBadge =>
                   WebDriver.FindElement(By.XPath("//div[@class='edit-mode requirements-badge']/img"));
        private IWebElement CapmBadgeText =>
                  WebDriver.FindElement(By.XPath("//div[@class='edit-mode requirements-badge']/div"));
        private IList<IWebElement> AcademicEducationValues =>
                  WebDriver.FindElements(By.XPath("//div[@class = 'academic-education-property__value']"));
        private IList<IWebElement> ProfessionalEducationValues =>
                  WebDriver.FindElements(By.XPath("//div[@class = 'professional-education-property__value']"));
        private IWebElement SecondaryDegree =>
                  WebDriver.FindElement(By.XPath("//div[@class='summary-container academic-education-summary academic-education-summary_complete']"));
        private IWebElement TotalSummaryHours =>
                  WebDriver.FindElement(By.XPath("//div[@class='summary__hours']"));
        private IWebElement ExperienceHeading =>
                  WebDriver.FindElement(By.XPath("//div/h2[contains(text(), 'Experience')]"));
        private IWebElement EducationBeardCrumb =>
           WebDriver.FindElement(By.XPath("//ul[@class = 'breadcrumbs']/li[contains(@class,'breadcrumbs__item breadcrumbs__item_passed')]//span[text()='Education']"));

        public By ContinueExperience => By.XPath("//button[text()='Continue To Experience']");

        private IWebElement CountryLists =>
           WebDriver.FindElement(By.XPath("//div[@class='p-dropdown-panel p-hidden p-input-overlay p-input-overlay-visible']//div[@class='p-dropdown-items-wrapper']"));
        private IWebElement AcademicEducationSavedDetailsView =>
            WebDriver.FindElement(By.XPath("//div[@class = 'academic-education academic-education__view']"));
        private IWebElement ProfessionalEducationSaveButton =>
            WebDriver.FindElement(By.XPath("//button[text()='Save Education']"));

        private IWebElement AcademicEducationSaveButton =>
            WebDriver.FindElement(By.XPath("//*[text()='Academic Education']/parent::div/following-sibling::form//div/button[text() = 'Save Education']"));

        private IWebElement ContinueToExamDetails =>
            WebDriver.FindElement(By.XPath("//button[text()='Continue To Exam Details']"));

        public By ContinueExamDetails => By.XPath("//span[text()='Continue to Exam Details']");

        private bool HighestLevelEduCLickable() => Extensions.Extensions.CatchUnavailableElement(() => HighestLevelEducationBtn.Displayed && HighestLevelEducationBtn.Enabled, false);
        private bool CountryOfInstitutionClickable() => Extensions.Extensions.CatchUnavailableElement(() => CountryOfInstitution.Displayed && CountryOfInstitution.Enabled, false);
        private bool AcademicEducationSaveButtonVisible() => Extensions.Extensions.CatchUnavailableElement(() => AcademicEducationSaveButton.Displayed && AcademicEducationSaveButton.Enabled, false);
        private bool EducationHeadingDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => _educationHeading.Displayed, false);

        public EducationPage EnterAcadamicEducationDetails(TestData testData)
        {
            Thread.Sleep(3000);
            _wait.Until(_ => HighestLevelEduCLickable());
            _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
            WebDriver.WaitUntilWebElementIsFound(d => HighestLevelEducationBtn, _userSettings.Timeout);
            HighestLevelEducationBtn.Wait(WebDriver, 5).Click(true);
            HighestLevelEducationList.FindElement(By.XPath(string.Format(AllListValue, testData.HighestLevelOfEducation))).Wait(WebDriver, 5).ScrollToElement(WebDriver).Click(true);
            YearsAttendedStartBtn.Wait(WebDriver).Click(true);
            YearsAttendedStartList.FindElement(By.XPath(string.Format(AllListValue, testData.EducationStartYear))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            YearsAttendedEndBtn.Wait(WebDriver).Click(true);
            YearsAttendedEndList.FindElement(By.XPath(string.Format(AllListValue, testData.EducationEndYear))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            Thread.Sleep(3000);
            _wait.Until(_ => CountryOfInstitutionClickable());
            CountryOfInstitution.Wait(WebDriver, 5).Click(true);
            CountryOfInstitution.FindElement(By.XPath(string.Format(Country, testData.CountryOfInstitution))).Wait(WebDriver, 5).ScrollToElement(WebDriver).ActionClick(WebDriver);
            NameOfInstitution.Wait(WebDriver).Clear();
            NameOfInstitution.Wait(WebDriver).SendKeys(testData.NameOfInstitution);
            NameOfInstitution.Wait(WebDriver).Click(true);
            if (!String.IsNullOrEmpty(testData.FieldOfStudy))
            {
                FieldOfStudySelectionBtn.Wait(WebDriver, 3).Click(true);
                FieldOfStudySelectionList.FindElement(By.XPath(string.Format(AllListValue, testData.FieldOfStudy))).Wait(WebDriver, 2).ScrollToElement(WebDriver).Click(true);
            }
            if (!String.IsNullOrEmpty(testData.DegreeProgram))
            {
                DegreeProgramSelectionBtn.Wait(WebDriver, 2).Click(true);
                DegreeProgramSelectionList.FindElement(By.XPath(string.Format(AllListValue.Replace("li", "span"), testData.DegreeProgram))).Wait(WebDriver, 2).ScrollToElement(WebDriver).Click(true);
            }
            SaveAcademicEducation.Wait(WebDriver).Click(true);
            _wait.Until(_ => !AcademicEducationSaveButtonVisible());
            Thread.Sleep(3000);
            return this;
        }

        private bool ProfessionalEducationSaveButtonVisible() => Extensions.Extensions.CatchUnavailableElement(() => ProfessionalEducationSaveButton.Displayed && ProfessionalEducationSaveButton.Enabled, false);

        public EducationPage EnterProfessionalEducationDetails(TestData testData)
        {
            ProviderName.Clear();
            ProviderName.SendKeys(testData.ProviderName);
            CourseTitle.Clear();
            CourseTitle.SendKeys(testData.CourseTitle);
            CourseDatesStartMonthBtn.Wait(WebDriver).Click(true);
            CourseDatesStartMonthList.FindElement(By.XPath(string.Format(AllListValue, testData.CourseStartMonth))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            CourseDatesStartYearBtn.Wait(WebDriver).Click(true);
            CourseDatesStartYearList.FindElement(By.XPath(string.Format(AllListValue, testData.CourseStartYear))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            CourseDatesEndMonthBtn.Wait(WebDriver).Click(true);
            CourseDatesEndMonthList.FindElement(By.XPath(string.Format(AllListValue, testData.CourseEndMonth))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            CourseDatesEndYearBtn.Wait(WebDriver).Click(true);
            CourseDatesEndYearList.FindElement(By.XPath(string.Format(AllListValue, testData.CourseEndYear))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            QualifyingHours.Wait(WebDriver).Clear();
            QualifyingHours.SendKeys(testData.QualifyingHours);
            SaveProfessionalEducation.Wait(WebDriver).Click(true);
            _wait.Until(_ => !ProfessionalEducationSaveButtonVisible());
            Thread.Sleep(3000);
            return this;
        }

        private bool AcademicEducationDetailsViewDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => AcademicEducationSavedDetailsView.Displayed, false);
        private bool EditEducationDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => EditEducation.Displayed && EditEducation.Enabled, false);

        public EducationPage VerifyAcademicEducationDetails(TestData testData)
        {
            var DegreeOrFieldOfStudy = "";
            if (testData.DegreeProgram == "")
            {
                DegreeOrFieldOfStudy = testData.FieldOfStudy;
            }
            else
            {
                DegreeOrFieldOfStudy = testData.DegreeProgram;
            }

            try
            {
                var expectedAcademicEducationDetails = new List<string>
                {
                testData.CountryOfInstitution,
                testData.EducationStartYear +" - "+testData.EducationEndYear,
                DegreeOrFieldOfStudy,
                testData.NameOfInstitution
                };
                _wait.Until(_ => AcademicEducationDetailsViewDisplayed());
                AcademicEducationHeading.Text.Should().Be(testData.HighestLevelOfEducation);
                var actualAcademicEducationDetails = new List<string>(AcademicEducationValues.Select(x => x.Text));
                foreach (String actualListValue in actualAcademicEducationDetails)
                {
                    if (!expectedAcademicEducationDetails.Contains(actualListValue))
                    {
                        Console.WriteLine("The actual academic value '" + actualListValue + "' is not met with expected academic value");
                        Assert.Fail();
                    }
                }
                _wait.Until(_ => EditEducationDisplayed());
            }
            catch (Exception _exception)
            {
                Console.WriteLine(_exception);
            }
            return this;
        }

        private bool EditProfessionalEducationDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => EditProfessionalEducation.Displayed && EditProfessionalEducation.Enabled, false);
        private bool RemoveProfessionalEducationDisplayed() => Extensions.Extensions.CatchUnavailableElement((Func<bool>)(() => (bool)(this.RemoveProfessionalEducation.Displayed && this.RemoveProfessionalEducation.Enabled)), false);

        public EducationPage VerifyProfessionalEducationDetails(TestData testData)
        {
            try
            {
                var expectedProfessionalEducationDetails = new List<string>
                {
                    testData.CourseTitle,
                    testData.ProviderName,
                    testData.CourseStartMonth +" "+testData.CourseStartYear+" - "
                        +testData.CourseEndMonth+" "+testData.CourseEndYear,
                    testData.QualifyingHours,
                };
                ProfessionalEducationHeadingValue.Text.Should().Be(testData.CourseTitle);
                var actualProfessionalEducationDetails = new List<string>(ProfessionalEducationValues.Select(x => x.Text));
                foreach (String actualListValue in actualProfessionalEducationDetails)
                {
                    if (!expectedProfessionalEducationDetails.Contains(actualListValue))
                    {
                        Console.WriteLine("The actual academic value '" + actualListValue + "' is not met with expected academic value");
                        Assert.Fail();
                    }
                }
                _wait.Until(_ => EditProfessionalEducationDisplayed());
                _wait.Until(_ => RemoveProfessionalEducationDisplayed());
            }
            catch (Exception _exception)
            {
                Console.WriteLine(_exception);
            }
            return this;
        }

        public EducationPage VerifyAcademicEducationSummary()
        {
            try
            {
                SecondaryDegree.GetCssValue("color").Should().Equals("rgba(67, 168, 62, 1)"); //rgba(67, 168, 62, 1) is the color HEX code of #43a83e 
            }
            catch (Exception _exception)
            {
                Console.WriteLine(_exception);
            }
            return this;
        }

        public EducationPage VerifyProfessionalEducationSummary()
        {
            try
            {
                TotalSummaryHours.GetCssValue("color").Should().Equals("rgba(67, 168, 62, 1)");
            }
            catch (Exception _exception)
            {
                Console.WriteLine(_exception);
            }
            return this;
        }

        private bool ContinueToExperience() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToExp.Displayed && ContinueToExp.Enabled, false);

        public EducationPage VerifyAndClickContinueExperience()
        {
            _wait.Until(_ => ContinueToExperience());
            ContinueToExp.Wait(WebDriver, 5).ActionClick(WebDriver);
            WebDriver.WaitForLoaderInvisible();
            _wait.Until(_ => !ContinueToExperience());
            WebDriver.WaitUntilWebElementIsFound(d => ExperienceHeading, _userSettings.Timeout);
            EducationBeardCrumb.Displayed.Should().BeTrue("Education Beard Crumb is not enabled");
            return this;
        }

        private bool ContinueToProjectExperience() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToProjectExp.Displayed && ContinueToProjectExp.Enabled, false);

        public EducationPage VerifyAndClickContinueToProjectExperience()
        {
            _wait.Until(_ => ContinueToProjectExperience());
            ContinueToProjectExp.Wait(WebDriver, 5).ActionClick(WebDriver);
            WebDriver.WaitForLoaderInvisible();
            _wait.Until(_ => !ContinueToProjectExperience());
            WebDriver.WaitUntilWebElementIsFound(d => ExperienceHeading, _userSettings.Timeout);
            EducationBeardCrumb.Displayed.Should().BeTrue("Education Beard Crumb is not enabled");
            return this;
        }
        private bool ContinueToBusinessExperience() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToBusinessExp.Displayed && ContinueToBusinessExp.Enabled, false);

        public EducationPage VerifyAndClickContinueToBusinessExperience()
        {
            _wait.Until(_ => ContinueToBusinessExperience());
            ContinueToBusinessExp.Wait(WebDriver, 5).ActionClick(WebDriver);
            WebDriver.WaitForLoaderInvisible();
            _wait.Until(_ => !ContinueToBusinessExperience());
            WebDriver.WaitUntilWebElementIsFound(d => ExperienceHeading, _userSettings.Timeout);
            EducationBeardCrumb.Displayed.Should().BeTrue("Education Beard Crumb is not enabled");
            return this;
        }

        private bool ContinueToProgramExperience() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToProgramExp.Displayed && ContinueToProgramExp.Enabled, false);

        public EducationPage VerifyAndClickContinueToProgramExperience()
        {
            _wait.Until(_ => ContinueToProgramExperience());
            ContinueToProgramExp.Wait(WebDriver, 5).ActionClick(WebDriver);
            WebDriver.WaitForLoaderInvisible();
            _wait.Until(_ => !ContinueToProgramExperience());
            WebDriver.WaitUntilWebElementIsFound(d => ExperienceHeading, _userSettings.Timeout);
            EducationBeardCrumb.Displayed.Should().BeTrue("Education Beard Crumb is not enabled");
            return this;
        }

        private bool EditProfEduClickable() => Extensions.Extensions.CatchUnavailableElement(() => EditProfessionalEducation.Displayed && EditProfessionalEducation.Enabled, false);

        public EducationPage EditProfessionalEducationDetails(TestData testData)
        {
            _wait.Until(_ => EditProfEduClickable());
            EditProfessionalEducation.Wait(WebDriver).ScrollToElement(WebDriver).ActionClick(WebDriver);
            CourseTitle.Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            CourseTitle.SendKeys(Keys.Control + "a");
            CourseTitle.SendKeys(Keys.Delete);
            CourseTitle.SendKeys(testData.CourseTitle);
            QualifyingHours.Wait(WebDriver).Click();
            QualifyingHours.SendKeys(Keys.Control + "a");
            QualifyingHours.SendKeys(Keys.Delete);
            QualifyingHours.SendKeys(testData.QualifyingHours);
            SaveProfessionalEducation.Wait(WebDriver).ActionClick(WebDriver);
            _wait.Until(_ => !ProfessionalEducationSaveButtonVisible());
            _wait.Until(_ => ContinueToExperience());

            return this;
        }

        private bool ContinueToExamDetailsClickable() => Extensions.Extensions.CatchUnavailableElement(() => ContinueToExamDetails.Displayed && ContinueToExamDetails.Enabled, false);

        public EducationPage VerifyAndClickContinueToExamDetails()
        {
            _wait.Until(_ => ContinueToExamDetailsClickable());
            ContinueToExamDetails.Wait(WebDriver, 5).ScrollToElement(WebDriver).WaitForSteadiness(WebDriver).ActionClick(WebDriver);
            WebDriver.WaitForLoaderInvisible();
            _wait.Until(_ => !ContinueToExamDetailsClickable());
            return this;
        }

        private bool AddAdditionalEducationClickable() => Extensions.Extensions.CatchUnavailableElement(() => AddAdditionalEducation.Displayed && AddAdditionalEducation.Enabled, false);

        public EducationPage AdditionalEducation()
        {
            _wait.Until(_ => AddAdditionalEducationClickable());
            AddAdditionalEducation.Wait(WebDriver).ActionClick(WebDriver);
            return this;
        }

        public EducationPage RemoveProfEducation()
        {

            var totalWait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            totalWait.Until(
                (Func<IWebDriver, bool>)(d =>
                {
                    try
                    {
                        if (RemoveProfessionalEducationDisplayed())
                        {
                            RemoveProfessionalEducation.ScrollToElement(WebDriver).ActionClick(WebDriver);
                        }

                        VerifyPageLoaded();

                        return !RemoveProfessionalEducationDisplayed();

                    }
                    catch (Exception)
                    {
                        return true;
                    }
                }));

            return this;
        }

        private bool CAPMBadgeDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => CapmBadge.Displayed && CapmBadge.Enabled, false);

        public EducationPage VerifyCAPMBadge()
        {
            _wait.Until(_ => CAPMBadgeDisplayed());
            CapmBadgeText.Text.Should().Be("Your CAPM certification fulfills the professional education requirements.");
            return this;
        }
    }
}
