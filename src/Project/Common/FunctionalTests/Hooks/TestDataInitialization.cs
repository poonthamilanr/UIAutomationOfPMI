using CsvHelper;
using CsvHelper.Configuration;
using System;
using System.Globalization;
using System.IO;
using System.Reflection;
using TechTalk.SpecFlow;

namespace Pmi.Certification.Functional.Tests.Hooks
{
    [Binding]
    public class TestDataInitialization
    {
        private readonly ScenarioContext _context;
        private readonly TestData _testData;
        private readonly UserSettings _userSettings;

        public TestDataInitialization(ScenarioContext context, TestData testData)
        {
            _context = context;
            _testData = testData;
            _userSettings = new UserSettings();
        }

        [Before]
        public void ReadTestDataBeforeTestRun()
        {
            //Should remove this code when reading it from shared location..
            var currentDirectory = Path.GetDirectoryName(new Uri(Assembly.GetExecutingAssembly().CodeBase).LocalPath);
            var csvConfiguration = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                MissingFieldFound = null,
                HasHeaderRecord = true
            };
            using (var reader = new StreamReader($@"{currentDirectory}\TestData_{_userSettings.Environment}.csv"))
            using (var csv = new CsvReader(reader, csvConfiguration))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    if (!csv.GetField("ScenarioName").Equals(_context.ScenarioInfo.Title)) continue;

                    _testData.ScenarioName = csv.GetField("ScenarioName");
                    _testData.Username = csv.GetField("Username");
                    _testData.Password = csv.GetField("Password");
                    _testData.HighestLevelOfEducation = csv.GetField("HighestLevelOfEducation");
                    _testData.EducationStartYear = csv.GetField("EducationStartYear");
                    _testData.EducationEndYear = csv.GetField("EducationEndYear");
                    _testData.CountryOfInstitution = csv.GetField("CountryOfInstitution");
                    _testData.NameOfInstitution = csv.GetField("NameOfInstitution");
                    _testData.FieldOfStudy = csv.GetField("FieldOfStudy");
                    _testData.DegreeProgram = csv.GetField("DegreeProgram");
                    _testData.CourseTitle = csv.GetField("CourseTitle");
                    _testData.ProviderName = csv.GetField("ProviderName");
                    _testData.CourseStartMonth = csv.GetField("CourseStartMonth");
                    _testData.CourseStartYear = csv.GetField("CourseStartYear");
                    _testData.CourseEndMonth = csv.GetField("CourseEndMonth");
                    _testData.CourseEndYear = csv.GetField("CourseEndYear");
                    _testData.QualifyingHours = csv.GetField("QualifyingHours");
                    _testData.ProjectTitle = csv.GetField("ProjectTitle");
                    _testData.Organization = csv.GetField("Organization");
                    _testData.JobTitle = csv.GetField("JobTitle");
                    _testData.FunctionalReportingArea = csv.GetField("FunctionalReportingArea");
                    _testData.OrganizationPrimaryFocus = csv.GetField("OrganizationPrimaryFocus");
                    _testData.Approach = csv.GetField("Approach");
                    _testData.ProjectTeamSize = csv.GetField("ProjectTeamSize");
                    _testData.ProjectBudget = csv.GetField("ProjectBudget");
                    _testData.ProjectStartMonth = csv.GetField("ProjectStartMonth");
                    _testData.ProjectStartYear = csv.GetField("ProjectStartYear");
                    _testData.ProjectEndMonth = csv.GetField("ProjectEndMonth");
                    _testData.ProjectEndYear = csv.GetField("ProjectEndYear");
                    _testData.ProjectDescription = csv.GetField("ProjectDescription");
                    _testData.Country = csv.GetField("Country");
                    _testData.Address = csv.GetField("Address");
                    _testData.City = csv.GetField("City");
                    _testData.State = csv.GetField("State");
                    _testData.ZipCode = csv.GetField("ZipCode");
                    _testData.Phone = csv.GetField("Phone");
                    _testData.ExamLocation = csv.GetField("ExamLocation");
                    _testData.CountryCode = csv.GetField("CountryCode");
                    _testData.NameOnCert = csv.GetField("NameOnCert");
                    _testData.ExamAccommodation = csv.GetField("ExamAccommodation");
                    _testData.AddressType = csv.GetField("AddressType");
                    _testData.PhoneNumberType = csv.GetField("PhoneNumberType");
                    _testData.CertType = csv.GetField("CertType");
                    _testData.AgileMethodology = csv.GetField("AgileMethodology");
                    _testData.ProgramProjectStartMonth1 = csv.GetField("ProgramProjectStartMonth1");
                    _testData.ProgramProjectStartYear1 = csv.GetField("ProgramProjectStartYear1");
                    _testData.ProgramProjectEndMonth1 = csv.GetField("ProgramProjectEndMonth1");
                    _testData.ProgramProjectEndYear1 = csv.GetField("ProgramProjectEndYear1");
                    _testData.ProgramProjectStartMonth2 = csv.GetField("ProgramProjectStartMonth2");
                    _testData.ProgramProjectStartYear2 = csv.GetField("ProgramProjectStartYear2");
                    _testData.ProgramProjectEndMonth2 = csv.GetField("ProgramProjectEndMonth2");
                    _testData.ProgramProjectEndYear2 = csv.GetField("ProgramProjectEndYear2");
                    _testData.DirectReports = csv.GetField("DirectReports");
                    _testData.DirectReportsPM = csv.GetField("DirectReportsPM");
                    _testData.ProjectPortfolios = csv.GetField("ProjectPortfolios");
                    _testData.ProjectStartMonth1 = csv.GetField("ProjectStartMonth1");
                    _testData.ProjectStartYear1 = csv.GetField("ProjectStartYear1");
                    _testData.ProjectEndMonth1 = csv.GetField("ProjectEndMonth1");
                    _testData.ProjectEndYear1 = csv.GetField("ProjectEndYear1");
                    break;
                }
            }
        }
    }
}
