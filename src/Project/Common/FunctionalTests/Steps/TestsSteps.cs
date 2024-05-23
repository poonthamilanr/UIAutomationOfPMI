namespace Pmi.Certification.Functional.Tests.Steps
{
    using Pmi.Certification.Functional.Tests.Hooks;
    using Pmi.Certification.Functional.Tests.Pages;
    using Pmi.Web.Ui.Framework;
    using Pmi.Web.Ui.Framework.Extensions;
    using System;
    using TechTalk.SpecFlow;

    [Binding]
    public class TestsSteps
    {
        private readonly ScenarioContext _context;
        private readonly TestData _testData;
        private readonly UserSettings _userSettings;

        public TestsSteps(ScenarioContext context, TestData testData)
        {
            _context = context;
            _testData = testData;
            _userSettings = new UserSettings();
        }

        [Given(@"Login with user")]
        public void GivenLoginWithUser()
        {
            _context.GoTo(_userSettings.BaseUrl, "/start-dummy");
            _context.Login(_testData.Username, _testData.Password);

        }

        [Given(@"Register a user")]
        public void GivenRegisterAUser()
        {
            var username = UserService.GenerateUsername().Substring(0, 20);
            var password = _userSettings.DefaultPassword;
            var email = username + "@pmi.org";
            Console.WriteLine($"User:{username}/{password}");
            UserRegistration.RegisterUser(username, email, password, _testData.CountryCode);
            UserProfile.UpdateAddress(username);
            _context.Login(username);
            _context["EmailComponent"] = email;
        }

        [Given(@"On the PMI\.org")]
        public void GivenOnThePMI_Org()
        {
            _context.GoTo(_userSettings.BaseUrl, "/");
            _context.VerifyPage<HomePage>();
        }

        [When(@"Apply for a PMP certification")]
        [When(@"Apply for a CAPM certification")]
        [When(@"Apply for a PMI-RMP certification")]
        [When(@"Apply for a PMI-SP certification")]
        [When(@"Apply for a PMI-PBA certification")]
        [When(@"Apply for a PMI-ACP certification")]
        [When(@"Apply for a PfMP certification")]
        [When(@"Apply for a PgMP certification")]
        [When(@"Apply for a DAVSC certification")]
        [When(@"Apply for a DAC certification")]
        [When(@"Apply for a DASSM certification")]
        [When(@"Apply for a CPBEP certification")]
        public void WhenApplyForACertification()
        {
            _context.GoTo(_userSettings.BaseUrl, "/launch/application/" + _testData.CertType);
            _context.VerifyPage<VirtualPage>()
                .VerifyPageLoaded()
                .VerifyApplicationHeading(_testData);
        }

        [When(@"Provide academic education")]
        public void WhenProvideAcademicEducation()
        {
            _context.InitPage<EducationPage>()
                 .EnterAcadamicEducationDetails(_testData);
        }

        [Then(@"Verify the academic education")]
        public void ThenVerifyTheAcademicEducation()
        {
            _context.InitPage<EducationPage>()
                .VerifyAcademicEducationDetails(_testData)
                .VerifyAcademicEducationSummary();
        }

        [When(@"Provide professional education")]
        public void WhenProvideProfessionalEducation()
        {
            _context.InitPage<EducationPage>()
                  .EnterProfessionalEducationDetails(_testData);
        }

        [Then(@"Verify professional education")]
        public void ThenVerifyProfessionalEducation()
        {
            _context.InitPage<EducationPage>()
               .VerifyProfessionalEducationDetails(_testData)
               .VerifyProfessionalEducationSummary();
        }

        [When(@"Continue to experience")]
        public void WhenContinueToExperience()
        {
            _context.InitPage<EducationPage>()
                .VerifyAndClickContinueExperience();
        }

        [When(@"Continue to project experience")]
        public void WhenContinueToProjectExperience()
        {
            _context.InitPage<EducationPage>()
                .VerifyAndClickContinueToProjectExperience();
        }

        [When(@"Continue to business experience")]
        public void WhenContinueToBusinessExperience()
        {
            _context.InitPage<EducationPage>()
                .VerifyAndClickContinueToBusinessExperience();
        }

        [When(@"Continue to program experience")]
        public void WhenContinueToProgramExperience()
        {
            _context.InitPage<ProjectExperiencePage>()
                .VerifyAndClickContinueToProgramExperience();
        }

        [When(@"Continue to portfolio experience")]
        public void WhenContinueToPortfolioExperience()
        {
            _context.InitPage<BusinessExperiencePage>()
                .VerifyAndClickContinueToBusinessExperience();
        }

        [When(@"Provide project experience")]
        public void WhenProvideProjectExperience()
        {
            _context.InitPage<ProjectExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.ProjectExperience);
        }

        [When(@"Provide business experience")]
        public void WhenProvideBusinessExperience()
        {
            _context.InitPage<BusinessExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.BusinessExperience);
        }

        [When(@"Provide professional experience")]
        [When(@"Provide business analyst experience")]
        [When(@"Provide agile and general experience")]
        [When(@"Provide portfolio experience")]
        [When(@"Provide program experience")]
        [When(@"Provide agile experience")]
        [When(@"Provide construction experience")]
        public void WhenProvideExperience()
        {
            switch (_testData.CertType.ToUpper())
            {
                case CertificationType.PMP:
                case CertificationType.RMP:
                case CertificationType.SP:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.Experience);
                    break;
                case CertificationType.PBA:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.BusinesAnalysisExperience);
                    break;
                case CertificationType.ACP:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.AgileExperience)
                    .FillExperienceDetails(_testData, ExperienceType.GeneralExperience);
                    break;
                case CertificationType.PfMP:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.PortfolioExperience);
                    break;
                case CertificationType.PgMP:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.ProgramExperience);
                    break;
                case CertificationType.DAVSC:
                case CertificationType.DASSM:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.AgileExperience);
                    break;
                case CertificationType.DAC:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.AgileCoachingExperience);
                    break;
                case CertificationType.CPBEP:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.ConstructionExperience);
                    break;
                default:
                    break;
            }
        }

        [Then(@"Verify project experience")]
        public void ThenVerifyProjectExperience()
        {
            _context.InitPage<ProjectExperiencePage>()
                 .VerifyExperienceDetails(_testData, ExperienceType.ProjectExperience)
                 .VerifyExperienceSummaryDetails(_testData, ExperienceType.ProjectExperience);
        }

        [Then(@"Verify business experience")]
        public void ThenVerifyBusinessExperience()
        {
            _context.InitPage<BusinessExperiencePage>()
                 .VerifyExperienceDetails(_testData, ExperienceType.BusinessExperience)
                 .VerifyExperienceSummaryDetails(_testData, ExperienceType.BusinessExperience);
        }

        [Then(@"Verify professional experience")]
        [Then(@"Verify business analyst experience")]
        [Then(@"Verify agile and  general experience")]
        [Then(@"Verify portfolio experience")]
        [Then(@"Verify program experience")]
        [Then(@"Verify agile experience")]
        [Then(@"Verify construction experience")]
        public void ThenVerifyProfessionalExperience()
        {
            switch (_testData.CertType.ToUpper())
            {
                case CertificationType.PMP:
                case CertificationType.RMP:
                case CertificationType.SP:
                    _context.InitPage<ExperiencePage>()
                .VerifyExperienceDetails(_testData, ExperienceType.Experience)
                .VerifyExperienceSummaryDetails(_testData, ExperienceType.Experience);
                    break;
                case CertificationType.PBA:
                    _context.InitPage<ExperiencePage>()
                .VerifyExperienceDetails(_testData, ExperienceType.BusinesAnalysisExperience)
                .VerifyExperienceSummaryDetails(_testData, ExperienceType.BusinesAnalysisExperience);
                    break;
                case CertificationType.PfMP:
                    _context.InitPage<ExperiencePage>()
                 .VerifyExperienceDetails(_testData, ExperienceType.PortfolioExperience)
                 .VerifyExperienceSummaryDetails(_testData, ExperienceType.PortfolioExperience);
                    break;
                case CertificationType.PgMP:
                    _context.InitPage<ExperiencePage>()
                 .VerifyExperienceDetails(_testData, ExperienceType.ProgramExperience)
                 .VerifyExperienceSummaryDetails(_testData, ExperienceType.ProgramExperience);
                    break;
                case CertificationType.ACP:
                    _context.InitPage<ExperiencePage>()
                .VerifyExperienceDetails(_testData, ExperienceType.AgileExperience)
                .VerifyExperienceSummaryDetails(_testData, ExperienceType.AgileExperience)
                .VerifyExperienceDetails(_testData, ExperienceType.GeneralExperience)
                .VerifyExperienceSummaryDetails(_testData, ExperienceType.GeneralExperience);
                    break;
                case CertificationType.DAVSC:
                case CertificationType.DASSM:
                    _context.InitPage<ExperiencePage>()
                .VerifyExperienceDetails(_testData, ExperienceType.AgileExperience)
                .VerifyExperienceSummaryDetails(_testData, ExperienceType.AgileExperience);
                    break;
                case CertificationType.DAC:
                    _context.InitPage<ExperiencePage>()
                .VerifyExperienceDetails(_testData, ExperienceType.AgileCoachingExperience)
                .VerifyExperienceSummaryDetails(_testData, ExperienceType.AgileCoachingExperience);
                    break;
                case CertificationType.CPBEP:
                    _context.InitPage<ExperiencePage>()
                .VerifyExperienceDetails(_testData, ExperienceType.ConstructionExperience)
                .VerifyExperienceSummaryDetails(_testData, ExperienceType.ConstructionExperience);
                    break;
                default:
                    break;
            }
        }

        [When(@"Continue to exam details")]
        public void WhenContinueToExamDetails()
        {
            switch (_testData.CertType.ToUpper())
            {
                case CertificationType.CAPM:
                    _context.InitPage<EducationPage>()
                        .VerifyAndClickContinueToExamDetails();
                    break;

                case CertificationType.PgMP:
                case CertificationType.PfMP:
                    _context.InitPage<ExperienceSummariesPage>()
                           .VerifyAndClickContinueToExamDetails();
                    break;

                default:
                    _context.InitPage<ExperiencePage>()
                           .VerifyAndClickContinueToExamDetails(_testData);
                    break;
            }
        }

        [When(@"Provide exam details")]
        public void WhenProvideExamDetails()
        {
            _context.InitPage<ExamDetailsPage>()
                .VerifyPmiLogo()
                .VerifyPageLoaded()
                .FillExamDetails(_testData);
        }

        [Then(@"Verify exam details")]
        public void ThenVerifyTheExamDetails()
        {
            _context.InitPage<ExamDetailsPage>()
            .VerifyExamDetails(_testData);
        }

        [When(@"Accept the terms and conditions")]
        public void WhenAcceptTheTermsAndConditions()
        {
            _context.InitPage<ExamDetailsPage>()
                .ProvideExamAccommodation(_testData)
                .AcceptTermsAndConditionsAndVerify();
        }

        [When(@"Submit the application")]
        public void WhenSubmitTheApplication()
        {
            _context.InitPage<ExamDetailsPage>()
                .ClickSubmitApplication();
        }

        [Then(@"Verify application is submitted")]
        public void ThenVerfyApplicationIsSubmitted()
        {
            _context.InitPage<LandingPage>()
                .VerifySubmit(_testData.CertType.ToUpper());
        }

        [Then(@"Logout of certification application")]
        public void ThenLogoutOfCertificationApplication()
        {
            _context.InitPage<LandingPage>()
                .Logout();
        }

        [Then(@"Education page is loaded")]
        public void ThenIShouldSeeEducationPageIsLoaded()
        {
            _context.InitPage<EducationPage>()
                .VerifyPmiLogo()
                .VerifyPageLoaded();
        }

        [Then(@"Experience page is loaded")]
        public void ThenIShouldSeeExperiencePageIsLoaded()
        {
            _context.InitPage<ExperiencePage>()
                .VerifyPmiLogo()
                .VerifyPageLoaded();
        }

        [Then(@"Project experience page is loaded")]
        public void ThenProjectExperiencePageIsLoaded()
        {
            _context.InitPage<ProjectExperiencePage>()
                .VerifyPmiLogo()
                .VerifyPageLoaded();
        }

        [When(@"Continue to experience summaries")]
        public void WhenContinueToExperienceSummaries()
        {
            _context.InitPage<ExperiencePage>()
                    .VerifyAndClickContinueToExperienceSummary();
        }

        [When(@"Provide experience summaries")]
        public void WhenProvideExperienceSummaryDetails()
        {
            _context.InitPage<ExperienceSummariesPage>()
                .FillExperienceSummariesDetails(_testData);
        }

        [Then(@"Verify experience summaries")]
        public void ThenVerifyExperienceSummaryDetails()
        {
            _context.InitPage<ExperienceSummariesPage>()
               .VerifyExperienceSummariesDetails(_testData);
        }

        [When(@"Edit professional education")]
        public void WhenEditProfessionalEducation()
        {
            _context
                .VerifyPage<EducationPage>()
                .EditProfessionalEducationDetails(_testData);
        }

        [When(@"Edit professional experience")]
        public void WhenEditProfessionalExperience()
        {
            _context.InitPage<ExperiencePage>()
                  .EditProfessionalExperience(_testData, ExperienceType.Experience);
        }

        [When(@"Add additional education")]
        public void WhenSelectAdditionalEducation()
        {
            _context.InitPage<EducationPage>()
                 .AdditionalEducation();
        }

        [When(@"Remove professional education")]
        public void WhenRemoveProfessionalEducation()
        {
            _context.InitPage<EducationPage>()
                 .RemoveProfEducation();
        }

        [When(@"Remove an experience")]
        public void WhenRemoveAnExperience()
        {
            switch (_testData.CertType.ToUpper())
            {
                case CertificationType.PMP:
                    _context.InitPage<ExperiencePage>()
                 .RemoveExperienceDetails(ExperienceType.Experience);
                    break;
                case CertificationType.PgMP:
                    _context.InitPage<ExperiencePage>()
                .RemoveExperienceDetails(ExperienceType.ProgramExperience);
                    break;
                case CertificationType.CPBEP:
                    _context.InitPage<ExperiencePage>()
                .RemoveExperienceDetails(ExperienceType.ConstructionExperience);
                    break;
                default:
                    break;
            }
        }

        [When(@"Select additional experience for '(.*)'")]
        public void WhenSelectAdditionalExperience(string experienceType)
        {
            switch (experienceType)
            {
                case ExperienceType.ProfessionalExperience:
                    _context.InitPage<ExperiencePage>()
                    .AdditionalExperience(ExperienceType.ProfessionalExperience);
                    break;
                case ExperienceType.ProgramExperience:
                    _context.InitPage<ExperiencePage>()
                        .AdditionalExperience(ExperienceType.ProgramExperience);
                    break;
                case ExperienceType.ProjectExperience:
                    _context.InitPage<ExperiencePage>()
                    .AdditionalExperience(ExperienceType.ProjectExperience);
                    break;
                case ExperienceType.Experience:
                    _context.InitPage<ExperiencePage>()
                    .AdditionalExperience(ExperienceType.Experience);
                    break;
                case ExperienceType.PortfolioExperience:
                    _context.InitPage<ExperiencePage>()
                    .AdditionalExperience(ExperienceType.PortfolioExperience);
                    break;
                default:
                    break;
            }
        }

        [When(@"Provide additional experience for '(.*)'")]
        public void WhenProvideAdditionalExperience(string additionalExperienceType)
        {
            switch (additionalExperienceType)
            {
                case ExperienceType.ProfessionalExperience:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.ProfessionalExperience);
                    break;
                case ExperienceType.ProgramExperience:
                    _context.InitPage<ExperiencePage>()
                        .FillExperienceDetails(_testData, ExperienceType.ProgramExperience);
                    break;
                case ExperienceType.ProjectExperience:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.ProjectExperience);
                    break;
                case ExperienceType.Experience:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.Experience);
                    break;
                case ExperienceType.PortfolioExperience:
                    _context.InitPage<ExperiencePage>()
                    .FillExperienceDetails(_testData, ExperienceType.PortfolioExperience);
                    break;
                default:
                    break;
            }
        }

        [Then(@"Show generic error page")]
        public void ThenShowGenericErrorPage()
        {
            _context.InitPage<LandingPage>()
                .VerifyGenericErrorPage();
        }

        [When(@"On project experience page")]
        public void WhenOnProjectExperiencePage()
        {
            _context.GoTo(_userSettings.BaseUrl, "/experience/pgmp-project")
                .VerifyPage<ProjectExperiencePage>()
                .VerifyPageLoaded();
        }

        [When(@"On experience page")]
        [When(@"On education page")]
        [When(@"On audit page")]
        public void MyPmiPageNavigation()
        {
            //Audit Page Launch
            if (_context.StepContext.StepInfo.Text.ToUpper().Contains("AUDIT PAGE"))
                _context.GoTo(_userSettings.BaseUrl, "/launch/audit/" + _testData.CertType.ToUpper());
            //Education Page Launch
            if (_context.StepContext.StepInfo.Text.ToUpper().Contains("EDUCATION PAGE"))
                _context.GoTo(_userSettings.BaseUrl, "/education");
            //Experience Page Launch
            if (_context.StepContext.StepInfo.Text.ToUpper().Contains("EXPERIENCE PAGE"))
                _context.GoTo(_userSettings.BaseUrl, "/experience/" + _testData.CertType.ToLower());

            _context.InitPage<VirtualPage>()
              .VerifyApplicationHeading(_testData);
        }

        [Then(@"Audit page is loaded")]
        public void ThenIShouldSeeAuditPageIsLoaded()
        {
            _context.InitPage<AuditPage>()
                .VerifyPmiLogo()
                .VerifyPageLoaded();
        }

        [Then(@"Verify audit page")]
        public void ThenVerifyAuditPageForPMP()
        {
            _context.InitPage<AuditPage>()
            .VerifyAuditPage(_testData);
        }

        [When(@"Upload education document")]
        public void WhenUploadEducationDocument()
        {
            _context.InitPage<AuditPage>()
            .UploadEducationDocument(_testData);
        }

        [Then(@"Verify the uploaded document")]
        public void WhenVerifyTheUploadedDocument()
        {
            _context.InitPage<AuditPage>()
             .VerifyUploadedEducationDocuments(_testData);
        }

        [When(@"Add reference details")]
        public void WhenAddReferenceDetails()
        {
            _context.InitPage<AuditPage>()
              .AddReferencesDetails(_testData);
        }

        [Then(@"Verify the provided reference details")]
        public void ThenVerifyTheProvidedReferenceDetails()
        {
            _context.InitPage<AuditPage>()
              .VerifyProvidedReferencesDetails(_testData);
        }

        [Then(@"Verify submit button is enabled")]
        public void ThenVerifySubmitButtonIsEnabled()
        {
            _context.InitPage<AuditPage>()
              .VerifyAuditSubmitButton();
        }

        [Then(@"Verify the reference details")]
        public void ThenVerifyTheReferenceDetails()
        {
            _context.InitPage<AuditPage>()
              .VerifyReferencesDetails(_testData);
        }

        [Then(@"Verify PMP badge")]
        public void ThenVerifyPMPBadge()
        {
            switch (_testData.CertType.ToUpper())
            {
                case CertificationType.PgMP:
                    _context.InitPage<ProjectExperiencePage>()
                .VerifyPMPBadge(ExperienceType.ProjectExperience);
                    break;
                case CertificationType.ACP:
                    _context.InitPage<ExperiencePage>()
                .VerifyPMPBadge(ExperienceType.GeneralExperience);
                    break;
            }
        }

        [Then(@"Verify CAPM badge")]
        public void ThenVerifyCAPMBadge()
        {
            _context.InitPage<EducationPage>()
                .VerifyCAPMBadge();
        }


    }
}
