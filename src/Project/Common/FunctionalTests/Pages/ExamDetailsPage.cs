#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests.Pages
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using NUnit.Framework;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Certification.Functional.Tests.Extensions;
    using Pmi.Certification.Functional.Tests.Hooks;
    using Pmi.Web.Ui.Framework.Extensions;
    using Pmi.Web.Ui.Framework.Page;
    using FluentAssertions;
    using System.Threading;
    using NUnit.Framework.Interfaces;

    public class ExamDetailsPage : BasePage<ExamDetailsPage>
    {
        private const string AllListValue = "//div[@class='p-dropdown-items-wrapper']//li[text()='{0}']";
        public override string RelativePath => "/";
        protected WebDriverWait _wait;
        private readonly UserSettings _userSettings;

        public ExamDetailsPage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            base.VerifyPageLoaded();
        }

        public override ExamDetailsPage VerifyPageLoaded()
        {
            //WebDriver.WaitForAllLoadersInvisible();
            return base.VerifyPageLoaded();
        }

        private static By PmiLogo => By.XPath("//header[@class='dsm app-header']//a");
        public override string BaseUrl => _userSettings.BaseUrl;

        private IWebElement Country =>
               WebDriver.FindElement(By.XPath("//label[@for='countryCode_select']/following-sibling::div//div[@role='button']"));
        private IWebElement Address1 =>
               WebDriver.FindElement(By.Id("address1_input"));
        private IWebElement Address2 =>
               WebDriver.FindElement(By.Id("address2_input"));
        private IWebElement City =>
               WebDriver.FindElement(By.Id("city_input"));
        private IWebElement State =>
               WebDriver.FindElement(By.XPath("//label[@for='state_select']//following-sibling::div/div"));
        private IWebElement ZipCode =>
               WebDriver.FindElement(By.Id("postalCode_input"));
        private IWebElement Attention =>
               WebDriver.FindElement(By.Id("attention_input"));
        private IWebElement Organization =>
               WebDriver.FindElement(By.Id("organizationName_input"));
        private IWebElement AddressHelpText =>
               WebDriver.FindElement(By.XPath("//p[text()='Enter an address where you have a permanent residence.']"));
        private IWebElement HomeAddress =>
              WebDriver.FindElement(By.XPath("addressSelectRadioButton0"));
        private IWebElement WorkAddress =>
              WebDriver.FindElement(By.Id("addressSelectRadioButton1"));
        private IWebElement ExamAccommodationNo =>
              WebDriver.FindElement(By.XPath("//div[@class = 'exam-location__accommodation-radio']//div//label[contains(text(),'I will NOT need')]/preceding-sibling::div/div[@role='radio']"));
        private IWebElement ExamAccommodationYes =>
              WebDriver.FindElement(By.XPath("//div[@class = 'exam-location__accommodation-radio']//div//label[contains(text(),'I will need')]/preceding-sibling::div/div[@role='radio']"));
        private IWebElement TermsAndAggrement =>
              WebDriver.FindElement(By.XPath("//label[text()='I agree to the']/preceding-sibling::div/div[@role = 'checkbox']"));
        private IWebElement AccurateAndConfirm =>
              WebDriver.FindElement(By.XPath("//label[text()='All information that I have provided is accurate and complete']/preceding-sibling::div/div[@role = 'checkbox']"));
        private IWebElement SubmitApplication =>
             WebDriver.FindElement(By.XPath("//button[text() = 'Submit Application']"));
        private IWebElement ReviewAuditDetails =>
             WebDriver.FindElement(By.XPath("//a[text()='Review Audit Details']"));
        private IWebElement SubmittedForReview =>
             WebDriver.FindElement(By.XPath("//h2[contains(text(), 'Your application has been submitted')]"));
        private IWebElement SaveAddress =>
             WebDriver.FindElement(By.XPath("//button[text()='Save Address']"));
        private IWebElement Email =>
             WebDriver.FindElement(By.Id("email_input"));
        private IWebElement SaveEmail =>
             WebDriver.FindElement(By.XPath("//button[text()='Save Email']"));
        private IWebElement MobilePhone =>
             WebDriver.FindElement(By.Id("phoneNumber_input"));
        private IWebElement SavePhone =>
             WebDriver.FindElement(By.XPath("//button[text()='Save Phone']"));
        private IWebElement EditAddress =>
             WebDriver.FindElement(By.XPath("//a[contains(text(),'Edit Address')]"));
        private IWebElement EditEmail =>
             WebDriver.FindElement(By.XPath("//a[contains(text(),'Edit Email')]"));
        private IWebElement EditPhone =>
             WebDriver.FindElement(By.XPath("//a[contains(text(),'Edit Phone')]"));
        private IWebElement AddressSectionValues =>
             WebDriver.FindElement(By.XPath("//div/h2[text() = 'Address']/following-sibling::address/p"));
        private IWebElement EmailValue =>
             WebDriver.FindElement(By.XPath("//h2[text()='Email Address']/following-sibling::p"));
        private IWebElement PhoneNumberValue =>
             WebDriver.FindElement(By.XPath("//h2[text()='Phone Number']/parent::div"));
        private IWebElement ExamLocation =>
             WebDriver.FindElement(By.XPath("//label[@for='examLocation_select']/following-sibling::div"));
        private By Submitbutton => By.XPath("//button[text()='Submit Application']");
        private IWebElement GroupNumber =>
              WebDriver.FindElement(By.Id("chinaGroupNumber_input"));
        private IWebElement GroupNumberError =>
              WebDriver.FindElement(By.Id("chinaGroupNumber_error"));
        private IWebElement CapmSuccess =>
              WebDriver.FindElement(By.XPath("//h2[text()='Your application has been approved!']"));
        private IWebElement ExamAccommodationProcess =>
              WebDriver.FindElement(By.XPath("//h2[text() = 'Exam Accommodations']"));
        private IWebElement CompleteExamAccommodation =>
              WebDriver.FindElement(By.XPath("//a[text() = 'Complete Exam Accommodations']"));
        private IWebElement TestAccommodation =>
              WebDriver.FindElement(By.XPath("//h1[text() = 'Test Accommodations']"));
        private IList<IWebElement> AddressData =>
              WebDriver.FindElements(By.XPath("//address/p"));
        private IWebElement NameOnCert =>
              WebDriver.FindElement(By.XPath("//h2[text()='Name on Identification']/following-sibling::p"));
        private IWebElement SubmitApplicationDisabled =>
              WebDriver.FindElement(By.XPath("//button[text()='Submit Application' and @disabled]"));
        private IWebElement SubmitApplicationEnabled =>
              WebDriver.FindElement(By.XPath("//button[text()='Submit Application']"));
        private IWebElement ExamLocationList =>
              WebDriver.FindElement(By.XPath("//label[@for='examLocation_select']/following-sibling::div//div//li"));
        private IWebElement AddressCountryDDList =>
              WebDriver.FindElement(By.XPath("//label[@for='countryCode_select']/following-sibling::div//div//li"));
        private IWebElement HomeStateDDList =>
              WebDriver.FindElement(By.XPath("//label[@for='state_select']//following-sibling::div/div/div//li"));
        private IWebElement WorkAddressRadioButton =>
              WebDriver.FindElement(By.XPath("//label[text() = 'Work Address']/parent::div//div[@role = 'radio']"));
        private IWebElement HomeAddressRadioButton =>
              WebDriver.FindElement(By.XPath("//label[text() = 'Home Address']/parent::div//div[@role = 'radio']"));
        private IWebElement MobilePhoneRadioButton =>
              WebDriver.FindElement(By.XPath("//input[@id = 'phoneSelectRadioButton0']/parent::div/following-sibling::div"));
        private IWebElement WorkPhoneRadioButton =>
              WebDriver.FindElement(By.XPath("//input[@id = 'phoneSelectRadioButton2']/parent::div/following-sibling::div"));
        private IWebElement HomePhoneRadioButton =>
              WebDriver.FindElement(By.XPath("//input[@id = 'phoneSelectRadioButton1']/parent::div/following-sibling::div"));
        private IWebElement AddressView =>
              WebDriver.FindElement(By.XPath("//*[starts-with(text(),'Address')]/parent::div/parent::div[@class='view-mode']"));
        private IWebElement PhoneView =>
            WebDriver.FindElement(By.XPath("//*[starts-with(text(),'Phone')]/parent::form[@class='view-mode']"));
        private IWebElement NameOnCertSave =>
              WebDriver.FindElement(By.XPath("//h2[text()='Name on Certificate']/following-sibling::div/button[text()='Save Name']"));
        private IWebElement NameOnEmailSave =>
              WebDriver.FindElement(By.XPath("//h2[text()='Email Address']/following-sibling::div/button[text()='Save Email']"));

        public ExamDetailsPage VerifyPmiLogo()
        {
            TimeSpan? timeout = _userSettings.Timeout;

            try
            {
                _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
                Assert.IsTrue(WebDriver.WaitUntilWebElementIsFound(PmiLogo).Displayed);
                PmiLogo.FindElement(WebDriver).Wait(WebDriver, 3);
            }
            catch (Exception)
            {

            }

            return this;

        }

        private bool ExamLocationClickable() => Extensions.CatchUnavailableElement(() => ExamLocation.Displayed && ExamLocation.Enabled, false);
        private bool ExamLocationListClickable() => Extensions.CatchUnavailableElement(() => ExamLocationList.Displayed && ExamLocationList.Enabled, false);
        private bool PhoneNumberDisplayed() => Extensions.CatchUnavailableElement(() => EditPhone.Displayed, false);
        private bool EditPhoneDisplayed() => Extensions.CatchUnavailableElement(() => EditPhone.Displayed && EditPhone.Enabled, false);
        private bool SaveNameClickable() => Extensions.CatchUnavailableElement(() => NameOnCertSave.Displayed && NameOnCertSave.Enabled, false);
        private bool SaveEmailClickable() => Extensions.CatchUnavailableElement(() => NameOnEmailSave.Displayed && NameOnEmailSave.Enabled, false);

        public ExamDetailsPage FillExamDetails(TestData testData)
        {
            Thread.Sleep(5000);
            SelectExamLocation(testData);
            //Switch statement to select and add contact number based on its type
            if (PhoneNumberDisplayed())
            {
                EditPhone.Wait(WebDriver, 5).ActionClick(WebDriver);
            }
            else
            {
                _wait.Until(_ => !EditPhoneDisplayed());
            }
            if (testData.PhoneNumberType.ToString() != String.Empty || testData.Phone.ToString() != String.Empty)
                switch (testData.PhoneNumberType.ToString().ToUpper())
            {
                case "MOBILE":
                    MobilePhoneRadioButton.Wait(WebDriver, 5).Click(true);
                    MobilePhoneRadioButton.GetAttribute("aria-checked").Equals(true);
                    AddContactNumberDetails(testData);
                    break;
                case "HOME":
                    HomePhoneRadioButton.Wait(WebDriver, 5).Click(true);
                    HomePhoneRadioButton.GetAttribute("aria-checked").Equals(true);
                    AddContactNumberDetails(testData);
                    break;
                case "WORK":
                    WorkPhoneRadioButton.Wait(WebDriver, 5).Click(true);
                    WorkPhoneRadioButton.GetAttribute("aria-checked").Equals(true);
                    AddContactNumberDetails(testData);
                    break;
                default:
                    MobilePhoneRadioButton.Wait(WebDriver, 5).Click(true);
                    MobilePhoneRadioButton.GetAttribute("aria-checked").Equals(true);
                    AddContactNumberDetails(testData);
                    break;
            }
            else
            {
                SavePhone.Wait(WebDriver).Click(true);
                _wait.Until(_ => !SavePhoneDisplayed());
                _wait.Until(_ => EditPhoneDisplayed());
            }
            if (SaveNameClickable())
            {
                _wait.Until(_ => SaveNameClickable());
                NameOnCertSave.Wait(WebDriver, 5).Click(true);
            }
            _wait.Until(_ => !SaveNameClickable());

            if (SaveEmailClickable())
            {
                _wait.Until(_ => SaveEmailClickable());
                NameOnEmailSave.Wait(WebDriver, 5).Click(true);
            }
            _wait.Until(_ => !SaveEmailClickable());
            return this;
        }

        public ExamDetailsPage SelectExamLocation(TestData testData)
        {
            _wait.Until(_ => ExamLocationClickable());
            ExamLocation.Wait(WebDriver, 30).ScrollToElement(WebDriver).LockExecution().ActionClick(WebDriver);
            _wait.Until(_ => ExamLocationListClickable());
            ExamLocationList.FindElement(By.XPath(string.Format(AllListValue, testData.ExamLocation))).Wait(WebDriver, 30).ActionClick(WebDriver);
            return this;
        }

        public ExamDetailsPage VerifyExamDetails(TestData testData)
        {
            try
            {
                var actualAddressData = new List<string>(AddressData.Select(x => x.Text));
                actualAddressData.Contains(testData.Address).Should().BeTrue("Address mismatch");
                actualAddressData.Contains(testData.Country).Should().BeTrue("Country mismatch");
                PhoneNumberValue.Text.Should().Contain(testData.Phone);
                NameOnCert.Text.Should().Be(testData.NameOnCert, "Actual Candidate Name has not met with expected");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return this;
        }

        private bool SubmitApplicationVisible() => Extensions.CatchUnavailableElement(() => SubmitApplication.Displayed && SubmitApplication.Enabled, false);

        public ExamDetailsPage AcceptTermsAndConditionsAndVerify()
        {
            TermsAndAggrement.Wait(WebDriver).Click(true);
            TermsAndAggrement.GetAttribute("role").Should().Equals(true);
            AccurateAndConfirm.Wait(WebDriver).Click(true);
            AccurateAndConfirm.GetAttribute("role").Should().Equals(true);
            _wait.Until(_ => SubmitApplicationVisible());
            return this;
        }

        public ExamDetailsPage ProvideExamAccommodation(TestData TestData)
        {
            ExamAccommodationProcess.Displayed.Should().BeTrue("Exam Accommodation header is not Displayed");
            ExamAccommodationProcess.Text.Should().Equals("Exam Accommodations");
            if (TestData.ExamAccommodation.ToUpper().Equals("YES"))
            {

                ExamAccommodationYes.Wait(WebDriver).Click(true);
                ExamAccommodationYes.Enabled.Should().BeTrue("Exam Accommodation YES is not Enabled");
            }
            else
            {
                ExamAccommodationNo.Wait(WebDriver).Click(true);
                ExamAccommodationNo.Enabled.Should().BeTrue("Exam Accommodation NO is not Enabled");
            }
            return this;
        }

        public ExamDetailsPage ClickSubmitApplication()
        {
            _wait.Until(_ => SubmitApplicationVisible());
            SubmitApplicationEnabled.Wait(WebDriver).Click(true);
            _wait.Until(_ => !SubmitApplicationVisible());
            return this;
        }

        private void AddAddressDetails(TestData testData)
        {
            HomeAddressRadioButton.Wait(WebDriver, 1).Displayed.Should().BeTrue();
            WorkAddressRadioButton.Wait(WebDriver, 1).Displayed.Should().BeTrue();
            Country.Wait(WebDriver, 5).ActionClick(WebDriver);
            AddressCountryDDList.FindElement(By.XPath(string.Format(AllListValue, testData.Country))).Wait(WebDriver, 5).ActionClick(WebDriver);
            Address1.Wait(WebDriver).ClearData();
            Address1.Wait(WebDriver).Click(true);
            Address1.SendKeys(testData.Address);
            City.Wait(WebDriver).Click(true);
            City.Wait(WebDriver).ClearData();
            City.SendKeys(testData.City);
            State.Wait(WebDriver).Click(true);
            HomeStateDDList.FindElement(By.XPath(string.Format(AllListValue, testData.State))).Wait(WebDriver).ScrollToElement(WebDriver).Click(true);
            ZipCode.Wait(WebDriver).Click(true);
            ZipCode.Wait(WebDriver).ClearData();
            ZipCode.SendKeys(testData.ZipCode);
            SaveAddress.Displayed.Should().BeTrue("Save address button is not Displayed");
            SaveAddress.Enabled.Should().BeTrue("Save address button is not Enabled");
            SaveAddress.Wait(WebDriver).Click(true);
            Thread.Sleep(3000);
            WebDriver.WaitUntilWebElementIsFound(d => EditAddress, _userSettings.Timeout);
        }

        private bool SavePhoneDisplayed() => Extensions.CatchUnavailableElement(() => SavePhone.Displayed && SavePhone.Enabled, false);

        private void AddContactNumberDetails(TestData testData)
        {
            WebDriver.WaitUntilWebElementIsFound(d => MobilePhone, _userSettings.Timeout);
            MobilePhone.Wait(WebDriver, 1).Enabled.Should().BeTrue("Phone Number text field is not Enabled");
            MobilePhone.Wait(WebDriver).Click(true);
            MobilePhone.Wait(WebDriver).ClearData();
            MobilePhone.SendKeys(testData.Phone);
            SavePhone.Enabled.Should().BeTrue("Phone Number Save button is not enabled");
            SavePhone.Wait(WebDriver).Click(true);
            _wait.Until(_ => !SavePhoneDisplayed());
            _wait.Until(_ => EditPhoneDisplayed());
        }

    }
}

