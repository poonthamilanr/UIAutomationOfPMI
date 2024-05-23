#pragma warning disable 649

namespace Pmi.Certification.Functional.Tests
{
    using FluentAssertions;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Support.UI;
    using Pmi.Certification.Functional.Tests.Extensions;
    using Pmi.Certification.Functional.Tests.Hooks;
    using Pmi.Web.Ui.Framework.Extensions;
    using Pmi.Web.Ui.Framework.Page;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    public class AuditPage : BasePage<AuditPage>
    {
        public override string RelativePath => "/";
        protected WebDriverWait _wait;
        private readonly UserSettings _userSettings;
        public override string BaseUrl => _userSettings.BaseUrl;
        public AuditPage(IWebDriver driver) : base(driver)
        {
            _userSettings = new UserSettings();
            _wait = new WebDriverWait(WebDriver, _userSettings.DefaultExplicitWaitTimeout);
            VerifyPageLoaded();
        }

        #region Locators
        private IWebElement pmiLogo => WebDriver.FindElement(By.XPath("//header[@class='dsm app-header']//a"));
        private IWebElement Body => WebDriver.FindElement(By.XPath("//body"));
        private IWebElement AuditPageTitle => WebDriver.FindElement(By.XPath("//title[text()='Audit']"));
        private IWebElement AuditPadeHeading => WebDriver.FindElement(By.XPath("//div/h1[contains(text(),'Application Audit')]"));
        private IList<IWebElement> BacktoMypmiOption => WebDriver.FindElements(By.XPath("//a[contains(text(),'Back to myPMI')]"));
        private IWebElement SubmitAuditButton => WebDriver.FindElement(By.XPath("//button[contains(text(), 'Submit Audit')]"));
        private IWebElement ApplicationAuditPanel => WebDriver.FindElement(By.XPath("//div[@class = 'auditBanner__left-panel']"));
        private IWebElement DocumentProvidedStatus => WebDriver.FindElement(By.XPath("(//div[@class = 'auditBanner__infoPanel'])[1]"));
        private IWebElement ReferencesCompleteStatus => WebDriver.FindElement(By.XPath("(//div[@class = 'auditBanner__infoPanel'])[2]"));
        private IWebElement DueDateToCompleteAudit => WebDriver.FindElement(By.XPath("(//div[@class = 'auditBanner__infoPanel'])[3]"));
        private IWebElement DocumentProvidedProgressBar => WebDriver.FindElement(By.XPath("(//div[@class = 'auditBanner__infoPanel'])[1]/div//div[contains(@class, 'auditBanner__progressBar')]/div/div"));
        private IWebElement ReferenceCompletedProgressBar => WebDriver.FindElement(By.XPath("(//div[@class = 'auditBanner__infoPanel'])[2]/div//div[contains(@class, 'auditBanner__progressBar')]/div/div"));
        private IWebElement AuditDueDateCompleteProgressBar => WebDriver.FindElement(By.XPath("(//div[@class = 'auditBanner__infoPanel'])[3]/div//div[contains(@class, 'auditBanner__progressBar')]/div/div"));
        private IWebElement EducationTextField(string educationType) => WebDriver.FindElement(By.XPath("//div[contains(@class, 'educationPanel')]//h2[text() = '" + educationType + " Education']"));
        private IWebElement EducationPanel(string educationType) => WebDriver.FindElement(By.XPath("//div[contains(@class, 'educationPanel')]//h2[text() = '" + educationType + " Education']/ancestor::div[starts-with(@class, 'educationPanel')]"));
        private IWebElement EducationDocumentUploadStatus(string educationType) => WebDriver.FindElement(By.XPath("//div[contains(@class, 'educationPanel')]//h2[text() = '" + educationType + " Education']/following-sibling::p[@class = 'educationInfohighlight']"));
        private IWebElement EducationUploadContentText(string educationType) => WebDriver.FindElement(By.XPath("//div[contains(@class, 'educationPanel')]//h2[text() = '" + educationType + " Education']/following-sibling::p[@class = 'educationInfohighlight']/following-sibling::p"));
        private IWebElement EducationFileUploadFieldAndDetails(string educationType) => WebDriver.FindElement(By.XPath("//h2[text() = '" + educationType + " Education']//ancestor::div[contains(@class, 'educationPanel')]//div[starts-with(@class, 'educationInfoBox')]//span"));
        private IWebElement UploadEducationDocumentOption(string educationType) => WebDriver.FindElement(By.XPath("//h2[text() = '" + educationType + " Education']//ancestor::div[contains(@class, 'educationPanel')]//div[starts-with(@class, 'educationInfoBox')]//a/div[text() = 'upload']"));
        private IWebElement UploadedDocumentField(string educationType) => WebDriver.FindElement(By.XPath("//h2[text() = '" + educationType + " Education']//ancestor::div[contains(@class, 'educationPanel')]//div[starts-with(@class, 'educationInfoBox')]//a[contains(@class, 'download_link')]"));
        private IWebElement RemoveUploadedDocumentButton(string educationType) => WebDriver.FindElement(By.XPath("//h2[text() = '" + educationType + " Education']//ancestor::div[contains(@class, 'educationPanel')]//div[starts-with(@class, 'educationInfoBox')]//a[contains(@class, 'remove_document btn')]"));
        private IWebElement DocumentUploadPopUp => WebDriver.FindElement(By.CssSelector(".modal-content"));
        private IWebElement FileUploadSectionInPopUp => WebDriver.FindElement(By.CssSelector("#EducationUploadAuditModalDesc"));
        private IWebElement BrowseOptionToUploadDocument => WebDriver.FindElement(By.XPath("//div[@class = 'modal-content']//div/a[text() = 'browse']"));
        private IWebElement UploadDocumentFormatsText => WebDriver.FindElement(By.XPath("//div[@class = 'modal-content']//div/a[text() = 'browse']/parent::div/following-sibling::div"));
        private IWebElement UploadDocumentPopUpCloseButton => WebDriver.FindElement(By.XPath("//div[@id = 'EducationUploadAuditModalTitle']/following-sibling::button[@class = 'close']/span[@aria-hidden = 'true']"));
        private IWebElement FileUploadingProgressBar => WebDriver.FindElement(By.XPath("//div[contains(@class, 'uploading-panel')]/h4[text() = 'Uploading']/following-sibling::div/div")); //get css value of width to get 0% - 100%
        private IWebElement ExperienceReferenceText(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]"));
        private IWebElement ExperienceReferenceStatus(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/following-sibling::p[@class = 'experienceInfoHighlight']"));
        private IWebElement ExperienceReferencePanel(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]"));
        private IWebElement ExperienceReferenceInfoCardPanel(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]"));
        private IWebElement ExperienceReferenceInfoPanelCardHeader(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div[contains(@class, 'card-header')]"));
        private IWebElement ReferenceFullNameLabel(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div/form/div//label[starts-with(@for, 'referenceName')]"));
        private IWebElement ReferenceFullNameTextBox(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div/form/div//input[@name = 'referenceName']"));
        private IWebElement ReferenceEmailLabel(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div/form/div//label[starts-with(@for, 'referenceEmail')]"));
        private IWebElement ReferenceEmailTextBox(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div/form/div//input[@name = 'referenceEmail']"));
        private IWebElement NoteToReferenceLabel(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div/form/div//label[starts-with(@for, 'referenceNote')]"));
        private IWebElement NoteToReferenceTextBox(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div/form/div//textarea[@name = 'referenceNote']"));
        private IWebElement SendReferenceButton(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div/form/div//button[@type = 'button']"));
        private IWebElement CharacterSizeTextOfNoteToReference(string experienceType) => WebDriver.FindElement(By.XPath("//h2[contains(text(), '" + experienceType + " Experience')]/ancestor::div[starts-with(@class, 'experiencePanel')]//div[starts-with(@class, 'experienceInfoBox')]/div/form/div//small"));
        private IWebElement allRequiredDocumentText => WebDriver.FindElement(By.XPath("//span[@class= 'info-style']"));
        private IWebElement UploadedDocumentDownloadPanel(string educationType) => WebDriver.FindElement(By.XPath("//h2[text() = '" + educationType + " Education']//ancestor::div[contains(@class, 'educationPanel')]//div[starts-with(@class, 'educationInfoBox')]//div[@class = 'docDownloadPanel row']"));
        private IWebElement UploadDocumentFile => WebDriver.FindElement(By.XPath("//div[@class = 'modal-content']//div[@class = 'drop-message']/input"));
        #endregion

        private bool BodyClickable() => Extensions.Extensions.CatchUnavailableElement(() => Body.Displayed && Body.Enabled, false);
        private bool PMILogoDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => pmiLogo.Displayed && pmiLogo.Enabled, false);
        private bool AuditHeadingDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => AuditPadeHeading.Displayed, false);
        private bool BackToMyPmiOptionDisplayed() => Extensions.Extensions.CatchUnavailableElement((Func<bool>)(() => (bool)(BacktoMypmiOption.All(x => x.Displayed && x.Enabled))), false);
        private bool SubmitAuditButtonnDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => SubmitAuditButton.Displayed, false);
        private bool SubmitAuditButtonnDisplayedAndEnabled() => Extensions.Extensions.CatchUnavailableElement(() => SubmitAuditButton.Displayed && SubmitAuditButton.Enabled, false);
        private bool DocumentUploadPopUpDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => DocumentUploadPopUp.Displayed, false);
        private bool FileUploadSectionInPopUpDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => FileUploadSectionInPopUp.Displayed, false);
        private bool UploadDocumentPopUpCloseButtonDisplayed() => Extensions.Extensions.CatchUnavailableElement(() => UploadDocumentPopUpCloseButton.Displayed && UploadDocumentPopUpCloseButton.Enabled, false);
        private bool UploadedDocumentDownloadPanelDisplayedAmdEnabled(string educationType) => Extensions.Extensions.CatchUnavailableElement(() => UploadedDocumentDownloadPanel(educationType).Displayed && UploadedDocumentDownloadPanel(educationType).Enabled, false);
        private bool EducationPanelDisplayed(string educationType) => Extensions.Extensions.CatchUnavailableElement(() => EducationPanel(educationType).Displayed, false);
        private bool RemoveUploadDocument(string educationType) => Extensions.Extensions.CatchUnavailableElement(() => RemoveUploadedDocumentButton(educationType).Displayed && RemoveUploadedDocumentButton(educationType).Enabled, false);


        public AuditPage VerifyPmiLogo()
        {
            TimeSpan? timeout = _userSettings.Timeout;
            try
            {
                _wait.Until(d => ((IJavaScriptExecutor)d).ExecuteScript("return document.readyState").Equals("complete"));
                _wait.Until(_ => PMILogoDisplayed());
            }
            catch (Exception _exception)
            {
                Console.WriteLine(_exception);
            }
            return this;
        }

        public override AuditPage VerifyPageLoaded()
        {
            _wait.Until(_ => BodyClickable());
            _wait.Until(_ => AuditHeadingDisplayed());
            return base.VerifyPageLoaded();
        }

        public AuditPage VerifyAuditPage(TestData _testData)
        {
            try
            {
                VerifyAuditApplicationPanel(_testData);
                //Education Details field validation
                if (!_testData.CertType.ToUpper().Equals(CertificationType.DAC) || !_testData.CertType.ToUpper().Equals(CertificationType.DAVSC) || !_testData.CertType.ToUpper().Equals(CertificationType.DASSM))
                {
                    foreach (string educationType in educationTypes(_testData))
                    {
                        if (UploadedDocumentDownloadPanelDisplayedAmdEnabled(educationType) && RemoveUploadDocument(educationType))
                            RemoveUploadedDocumentButton(educationType).ScrollToElement(WebDriver).Click();
                        _wait.Until(_ => UploadEducationDocumentOption(educationType));
                        _wait.Until(_ => EducationPanel(educationType).Displayed);
                        EducationTextField(educationType).Text.Equals(educationType + " Education").Should().BeTrue();
                        EducationDocumentUploadStatus(educationType).Text.Equals("0 of 1 Documents provided").Should().BeTrue("Actual " + educationType + " document upload status is not met with expected");
                        EducationFileUploadFieldAndDetails(educationType).Displayed.Should().BeTrue();
                        EducationFileUploadFieldAndDetails(educationType).Text.Length.Should().BeGreaterThan(0, "Academic details are listed on upload section : " + EducationFileUploadFieldAndDetails(educationType).Text, false);
                        UploadEducationDocumentOption(educationType).Displayed.Should().BeTrue();
                    }
                    //Verify Upload Document PopUp
                    foreach (string educationType in educationTypes(_testData))
                        VerifyUploadDocumentPopUP(educationType);
                }

                //Reference details field validation
                foreach (string experienceType in experienceTypes(_testData))
                {
                    ExperienceReferenceText(experienceType).Text.Equals(experienceType + " Experience References").Should().BeTrue();
                    ExperienceReferenceStatus(experienceType).Text.Equals("0 of 1 references provided").Should().BeTrue("Actual " + experienceType + " document upload status is not met with expected");
                    ExperienceReferenceInfoPanelCardHeader(experienceType).Text.Contains("Reference Needed").Should().BeTrue("Reference Needed text is not displayed", false);
                    ReferenceFullNameLabel(experienceType).Text.Equals("Reference Full Name").Should().BeTrue("Actual Reference Full Name label is not met with expected. Actual result : " + ReferenceFullNameLabel(experienceType).Text, false);
                    ReferenceFullNameTextBox(experienceType).Enabled.Should().BeTrue("Reference Full Name text box is not enabled", false);
                    ReferenceEmailLabel(experienceType).Text.Equals("Reference Email").Should().BeTrue("Actual Reference Full Name label is not met with expected. Actual result : " + ReferenceEmailLabel(experienceType).Text, false);
                    ReferenceEmailTextBox(experienceType).Enabled.Should().BeTrue("Reference Email text box is not enabled", false);
                    NoteToReferenceLabel(experienceType).Text.Equals("Note to Reference").Should().BeTrue("Actual Reference Full Name label is not met with expected. Actual result : " + NoteToReferenceLabel(experienceType).Text, false);
                    NoteToReferenceTextBox(experienceType).Enabled.Should().BeTrue("Note To Reference text box is not enabled", false);
                    CharacterSizeTextOfNoteToReference(experienceType).Text.ToString().Equals("120Characters Remaining").Should().BeTrue("Actual reference note character length is not met wit 120. Actual result: " + CharacterSizeTextOfNoteToReference(experienceType).Text, false);
                    SendReferenceButton(experienceType).Displayed.Should().BeTrue("Send Reference button is not displayed", false);
                    SendReferenceButton(experienceType).Enabled.Should().BeFalse("Send Reference Request button is enabled", true);
                }

                allRequiredDocumentText.Text.Should().Be("*All required documents must be provided before you can submit your audit.", "All required document text is not displayed", false);
            }
            catch (Exception _exception)
            {
                Console.Write(_exception);
            }
            return this;
        }

        private AuditPage VerifyUploadDocumentPopUP(string educationType)
        {
            UploadEducationDocumentOption(educationType).Wait(WebDriver).ScrollToElement(WebDriver).Click();
            _wait.Until(_ => DocumentUploadPopUpDisplayed());
            _wait.Until(_ => FileUploadSectionInPopUpDisplayed());
            _wait.Until(_ => UploadDocumentPopUpCloseButtonDisplayed());
            UploadDocumentFormatsText.Text.Equals("Only JPEG, JPG, PNG, GIF, TIFF, and PDF files with a max size of 10MB").Should().BeTrue("Actual : " + UploadDocumentFormatsText.Text + " upload document format is not met with an expected", false);
            BrowseOptionToUploadDocument.Displayed.Should().BeTrue();
            BrowseOptionToUploadDocument.Enabled.Should().BeTrue();
            UploadDocumentPopUpCloseButton.ScrollToElement(WebDriver).Click();
            _wait.Until(_ => !DocumentUploadPopUpDisplayed());
            _wait.Until(_ => EducationPanelDisplayed(educationType));
            return this;
        }

        private AuditPage VerifyAuditApplicationPanel(TestData _testData)
        {
            AuditPadeHeading.Text.ToUpper().Contains(_testData.CertType.ToUpper()).Should().BeTrue("Actual Audit Certification type is not met with an expected. Actual result : " + AuditPadeHeading.Text, false);
            _wait.Until(_ => BackToMyPmiOptionDisplayed());
            _wait.Until(_ => SubmitAuditButtonnDisplayed());
            ApplicationAuditPanel.WaitForSteadiness(WebDriver).Displayed.Should().BeTrue("Actual Audit application user details is not displayed", false);
            if (!_testData.CertType.ToUpper().Equals(CertificationType.DAVSC) || !_testData.CertType.ToUpper().Equals(CertificationType.DAC) || !_testData.CertType.ToUpper().Equals(CertificationType.DASSM))
                Extensions.Extensions.CatchUnavailableElement(() => DocumentProvidedStatus.Displayed && DocumentProvidedProgressBar.Displayed, false);
            Extensions.Extensions.CatchUnavailableElement(() => ReferencesCompleteStatus.Displayed && ReferenceCompletedProgressBar.Displayed, false);
            Extensions.Extensions.CatchUnavailableElement(() => DueDateToCompleteAudit.Displayed && AuditDueDateCompleteProgressBar.Displayed, false);
            foreach (string educationType in educationTypes(_testData))
            {
                if (UploadedDocumentDownloadPanelDisplayedAmdEnabled(educationType) && RemoveUploadDocument(educationType))
                    RemoveUploadedDocumentButton(educationType).ScrollToElement(WebDriver).Click();
                _wait.Until(_ => UploadEducationDocumentOption(educationType));
                _wait.Until(_ => EducationPanel(educationType).Displayed);
            }
            if (DocumentProvidedStatus.Displayed)
            {
                var statusOfDocumentProvided = DocumentProvidedStatus.Text.ToString().Split(' ');
                statusOfDocumentProvided[3].Concat(" " + statusOfDocumentProvided[4]).Should().Equals("Documents Provided");
                Convert.ToInt16(statusOfDocumentProvided[2]).Should().BeGreaterThan(Convert.ToInt16(statusOfDocumentProvided[0]));
                DocumentProvidedProgressBar.GetCssValue("width").Should().Be("0px", "Actual Width of the document provided progress bar not met the progress percentage. Actual result : " + DocumentProvidedProgressBar.GetCssValue("width"), false);
            }
            if (ReferencesCompleteStatus.Displayed)
            {
                var statusOfReferenceComplete = ReferencesCompleteStatus.Text.ToString().Split(' ');
                statusOfReferenceComplete[3].Concat(" " + statusOfReferenceComplete[4]).Should().Equals("References Complete");
                Convert.ToInt16(statusOfReferenceComplete[2].ToString()).Should().BeGreaterThan(Convert.ToInt16(statusOfReferenceComplete[0].ToString()));
                ReferenceCompletedProgressBar.GetCssValue("width").Should().Be("0px", "Actual Width of the document provided progress bar not met the progress percentage : " + ReferenceCompletedProgressBar.GetCssValue("width"), false);
            }
            return this;
        }

        public AuditPage UploadEducationDocument(TestData _testData)
        {
            //string filePath = Directory.GetCurrentDirectory();
            string filePath = AppDomain.CurrentDomain.BaseDirectory;
            if (!_testData.CertType.ToUpper().Equals(CertificationType.DAC) || !_testData.CertType.ToUpper().Equals(CertificationType.DAVSC) || !_testData.CertType.ToUpper().Equals(CertificationType.DASSM))
            {
                foreach (string educationType in educationTypes(_testData))
                {
                    try
                    {
                        if (UploadedDocumentDownloadPanelDisplayedAmdEnabled(educationType) && RemoveUploadDocument(educationType))
                            RemoveUploadedDocumentButton(educationType).ScrollToElement(WebDriver).Click();
                        _wait.Until(_ => UploadEducationDocumentOption(educationType));
                        UploadEducationDocumentOption(educationType).Wait(WebDriver).ScrollToElement(WebDriver).Click();
                        _wait.Until(_ => DocumentUploadPopUpDisplayed());
                        _wait.Until(_ => FileUploadSectionInPopUpDisplayed());
                        _wait.Until(_ => UploadDocumentPopUpCloseButtonDisplayed());
                        UploadDocumentFormatsText.Text.Equals("Only JPEG, JPG, PNG, GIF, TIFF, and PDF files with a max size of 10MB").Should().BeTrue("Actual : " + UploadDocumentFormatsText.Text + " upload document format is not met with an expected", false);
                        BrowseOptionToUploadDocument.Displayed.Should().BeTrue().And.Be(BrowseOptionToUploadDocument.Enabled);
                        UploadDocumentFile.SendKeys(filePath + @"\UploadDocuments\EducationDocument.pdf");
                        _wait.Until(_ => !DocumentUploadPopUpDisplayed());
                        UploadedDocumentDownloadPanelDisplayedAmdEnabled(educationType).Should().BeTrue("Education Document is not uploaded properly", false);
                        UploadedDocumentField(educationType).Text.Should().Be("EducationDocument.pdf", "Uploaded " + educationType + " education document is not displayed", false);
                    }
                    catch (Exception _exception)
                    {
                        Console.WriteLine(_exception);
                    }
                }
            }
            return this;
        }

        public AuditPage VerifyUploadedEducationDocuments(TestData _testData)
        {
            if (!_testData.CertType.ToUpper().Equals(CertificationType.DAC) || !_testData.CertType.ToUpper().Equals(CertificationType.DAVSC) || !_testData.CertType.ToUpper().Equals(CertificationType.DASSM))
            {
                _wait.Until(_ => DocumentProvidedStatus.Displayed);
                var statusOfDocumentProvided = DocumentProvidedStatus.Text.ToString().Split(' ');
                Convert.ToInt16(statusOfDocumentProvided[2]).Should().BeGreaterOrEqualTo(Convert.ToInt16(statusOfDocumentProvided[0]));
                string progressStatusOfUploadedDocument = DocumentProvidedProgressBar.GetCssValue("width").ToString().Replace("px", "");
                Convert.ToDecimal(progressStatusOfUploadedDocument).Should().BeGreaterOrEqualTo((short)100d, "Actual Width of the document provided progress bar not met the progress percentage. Actual result : " + progressStatusOfUploadedDocument, false);
                foreach (string educationType in educationTypes(_testData))
                {
                    EducationDocumentUploadStatus(educationType).Text.Equals("1 of 1 Documents provided").Should().BeTrue("Actual " + educationType + " document upload status is not met with expected");
                    UploadedDocumentField(educationType).Text.Should().Be("EducationDocument.pdf", "Uploaded " + educationType + " education document is not displayed", false);
                    UploadedDocumentDownloadPanelDisplayedAmdEnabled(educationType).Should().BeTrue().And.Be(RemoveUploadDocument(educationType), "Uploaded Document is not displayed", false);
                }
            }
            return this;
        }

        public AuditPage AddReferencesDetails(TestData _testData)
        {
            foreach (string experienceType in experienceTypes(_testData))
            {
                ExperienceReferenceText(experienceType).Text.Equals(experienceType + " Experience References").Should().BeTrue();
                ExperienceReferenceStatus(experienceType).Text.Equals("0 of 1 references provided").Should().BeTrue("Actual " + experienceType + " document upload status is not met with expected");
                ReferenceFullNameTextBox(experienceType).ScrollToElement(WebDriver).SendKeys("TestName");
                ReferenceEmailTextBox(experienceType).ScrollToElement(WebDriver).SendKeys("Testname@pmi.org");
                NoteToReferenceTextBox(experienceType).ScrollToElement(WebDriver).SendKeys("Reference Note: Please verify and approve education details in DocuSign");
                _wait.Until(_ => SendReferenceButton(experienceType).Enabled.Should().BeTrue("Send Reference Request button is not enabled", false));
            }
            return this;
        }

        public AuditPage VerifyReferencesDetails(TestData _testData)
        {
            var statusOfReferenceComplete = ReferencesCompleteStatus.Text.ToString().Split(' ');
            statusOfReferenceComplete[3].Concat(" " + statusOfReferenceComplete[4]).Should().Equals("References Complete");
            Convert.ToInt16(statusOfReferenceComplete[2].ToString()).Should().BeGreaterOrEqualTo(Convert.ToInt16(statusOfReferenceComplete[0].ToString()));
            string progressStatusOfReferences = ReferenceCompletedProgressBar.GetCssValue("width").ToString().Replace("px", "");
            Convert.ToDecimal(progressStatusOfReferences).Should().BeGreaterOrEqualTo((short)0d, "Actual Width of the document provided progress bar not met the progress percentage : " + ReferenceCompletedProgressBar.GetCssValue("width"), false);
            foreach (string experienceType in experienceTypes(_testData))
            {
                ExperienceReferenceText(experienceType).Text.Equals(experienceType + " Experience References").Should().BeTrue();
                ExperienceReferenceStatus(experienceType).Text.Equals("0 of 1 references provided").Should().BeTrue("Actual " + experienceType + " document upload status is not met with expected");
                SendReferenceButton(experienceType).Enabled.Should().BeTrue("Send Reference Request button is not enabled", false);
            }
            return this;
        }

        public AuditPage VerifyProvidedReferencesDetails(TestData _testData)
        {
            var statusOfReferenceComplete = ReferencesCompleteStatus.Text.ToString().Split(' ');
            statusOfReferenceComplete[3].Concat(" " + statusOfReferenceComplete[4]).Should().Equals("Response Provided");
            Convert.ToInt16(statusOfReferenceComplete[2].ToString()).Should().BeGreaterOrEqualTo(Convert.ToInt16(statusOfReferenceComplete[0].ToString()));
            string progressStatusOfReferences = ReferenceCompletedProgressBar.GetCssValue("width").ToString().Replace("px", "");
            Convert.ToDecimal(progressStatusOfReferences).Should().BeGreaterOrEqualTo((short)100d, "Actual Width of the document provided progress bar not met the progress percentage : " + ReferenceCompletedProgressBar.GetCssValue("width"), false);
            foreach (string experienceType in experienceTypes(_testData))
            {
                ExperienceReferenceText(experienceType).Text.Equals(experienceType + " Experience References").Should().BeTrue();
                ExperienceReferenceStatus(experienceType).Text.Equals("1 of 1 references provided").Should().BeTrue("Actual " + experienceType + " document upload status is not met with expected");
            }
            return this;
        }

        public AuditPage VerifyAuditSubmitButton()
        {
            _wait.Until(_ => SubmitAuditButtonnDisplayedAndEnabled());
            SubmitAuditButtonnDisplayedAndEnabled().Should().BeTrue("Audit Submit button is not Displaye/Enabled", false);
            return this;
        }

        private static string[] educationTypes(TestData _testData)
        {
            var educations = "";
            if (_testData.CertType.ToUpper().Equals(CertificationType.PMP))
                educations = "Academic|Professional";
            else
                educations = "Academic";
            string[] educationTypeArrray = educations.Split('|').ToArray();
            return educationTypeArrray;
        }

        private static string[] experienceTypes(TestData _testData)
        {
            var experience = "";
            if (_testData.CertType.ToUpper().Equals(CertificationType.PMP))
                experience = "General Project";
            else if (_testData.CertType.ToUpper().Equals(CertificationType.PgMP))
                experience = "General Project|Program";
            string[] expereinceTypeArrray = experience.Split('|').ToArray();
            return expereinceTypeArrray;
        }
    }
}