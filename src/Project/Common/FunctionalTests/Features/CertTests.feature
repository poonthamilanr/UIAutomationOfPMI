@browser:Chrome-Headless
Feature: Cert application submission
This features covers the cert application for legacy, Disciplined Agile 
and any other certifications that need the application to be filled

@Qa @Can @Prod @notify-teams @testpipeline @productionMonitoring @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Verify user can access certification application module
   Given Login with user
	When Apply for a PMP certification
	 And On education page
	Then Education page is loaded
	When Edit professional education
	Then Verify professional education
	When Continue to experience
	 And Edit professional experience
	Then Verify professional experience
	When Continue to exam details
	 And Provide exam details
	 And Accept the terms and conditions
	Then Verify exam details

@testpmp @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a PMP certification
   Given On the PMI.org
	 And Register a user
	When Apply for a PMP certification
	Then Education page is loaded
	When Provide academic education
	Then Verify the academic education
	When Provide professional education
	Then Verify professional education
	When Continue to experience
	 And Provide professional experience
	Then Verify professional experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testcapm @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a CAPM certification
   Given On the PMI.org
	 And Register a user
	When Apply for a CAPM certification
	Then Education page is loaded
	When Provide academic education
	Then Verify the academic education
	When Provide professional education
	Then Verify professional education
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testrmp @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a PMI-RMP certification
   Given On the PMI.org
	 And Register a user
	When Apply for a PMI-RMP certification
	Then Education page is loaded
	When Provide academic education
	Then Verify the academic education
	When Provide professional education
	Then Verify professional education
	When Continue to experience
	 And Provide professional experience
	Then Verify professional experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testsp @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a PMI-SP certification
   Given On the PMI.org
	 And Register a user
	When Apply for a PMI-SP certification
	Then Education page is loaded
	When Provide academic education
	Then Verify the academic education
	When Provide professional education
	Then Verify professional education
	When Continue to experience
	 And Provide professional experience
	Then Verify professional experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testpba @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a PMI-PBA certification
   Given On the PMI.org
	 And Register a user
	When Apply for a PMI-PBA certification
	Then Education page is loaded
	When Provide academic education
	Then Verify the academic education
	When Provide professional education
	Then Verify professional education
	When Continue to experience
	 And Provide business analyst experience
	Then Verify business analyst experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testacp @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a PMI-ACP certification
   Given On the PMI.org
	 And Register a user
	When Apply for a PMI-ACP certification
	Then Education page is loaded
	When Provide academic education
	Then Verify the academic education
	When Provide professional education
	Then Verify professional education
	When Continue to experience
	 And Provide agile and general experience
	Then Verify agile and  general experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testpgmp @Qa @Can @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a PgMP certification
   Given On the PMI.org
	 And Register a user
	When Apply for a PgMP certification
	Then Education page is loaded
	When Provide academic education
	Then Verify the academic education
	When Continue to project experience
	 And Provide project experience
	Then Verify project experience
	When Continue to program experience
	 And Provide program experience
	Then Verify program experience
	When Continue to experience summaries
	 And Provide experience summaries
	Then Verify experience summaries
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testpfmp @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a PfMP certification
   Given On the PMI.org
	 And Register a user
	When Apply for a PfMP certification
	Then Education page is loaded
	When Provide academic education
	Then Verify the academic education
	When Continue to business experience
	 And Provide business experience
	Then Verify business experience
	When Continue to portfolio experience
	 And Provide portfolio experience
	Then Verify portfolio experience
	When Continue to experience summaries
	 And Provide experience summaries
	Then Verify experience summaries
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testdavsc @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a DAVSC certification
   Given On the PMI.org
	 And Register a user
	When Apply for a DAVSC certification
	 And Provide agile experience
	Then Verify agile experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testdac @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a DAC certification
   Given On the PMI.org
	 And Register a user
	When Apply for a DAC certification
	 And Provide agile experience
	Then Verify agile experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testdassm @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to submit a DASSM certification
   Given On the PMI.org
	 And Register a user
	When Apply for a DASSM certification
	 And Provide agile experience
	Then Verify agile experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions
	 And Submit the application
	Then Verify application is submitted
	 And Logout of certification application

@testcpbepunabletoapply @Qa @Can @Prod @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user unable to submit a CPBEP certification when preriquisite not met
   Given Login with user
	When Apply for a CPBEP certification
	Then Show generic error page

@testcpbepabletoapply @Qa @Can @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user able to navigate to submit screens for CPBEP certification when preriquisite completed
   Given Login with user
	When Apply for a CPBEP certification
	 And On experience page
    Then Experience page is loaded
	When Remove an experience
	 And Provide construction experience
	Then Verify construction experience
	When Continue to exam details
	 And Provide exam details
	Then Verify exam details
	When Accept the terms and conditions

@multipleprofedu @Can @Qa @Prod @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to add multiple professional education
   Given Login with user
    When Apply for a PMP certification
	 And On education page
    Then Education page is loaded
	When Remove professional education
	 And Provide professional education
	 And Add additional education
	 And Provide professional education
	Then Verify professional education

@multipleexperience @Can @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to add multiple experience
   Given Login with user
    When Apply for a PMP certification
	 And On experience page
    Then Experience page is loaded
	When Remove an experience
	 And Provide professional experience
	 And Select additional experience for 'Experience'
	 And Provide professional experience
	Then Verify professional experience

@multipleexperiencepgmp @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to add multiple experience for PgMP application
   Given Login with user
    When Apply for a PgMP certification
	 And On experience page
    Then Experience page is loaded
	When Remove an experience
	 And Provide program experience
	 And Select additional experience for 'Program Experience'
	 And Provide additional experience for 'Program Experience'
	Then Verify program experience

@ExperienceBadge @Qa @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to validate the PMP badge on experience page of PgMP
   Given Login with user
	When Apply for a PgMP certification
	 And On project experience page
    Then Project experience page is loaded
	 And Verify PMP badge

@ExperienceBadge @Qa @Can @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to validate the PMP badge on experience page of PMI-ACP
   Given Login with user
	When Apply for a PMI-ACP certification
    Then Experience page is loaded
	 And Verify PMP badge

@EducationBadge @Qa @Can @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to validate the CAPM badge on education page of PMP
   Given Login with user
	When Apply for a PMP certification
	 And On education page
    Then Education page is loaded
	 And Verify CAPM badge