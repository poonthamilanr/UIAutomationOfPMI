@browser:Chrome-Headless
Feature: Cert application audit
This feature covers the cert application audit flow

@auditpmp @Qa @Can @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to view required fields in audit page for PMP
   Given Login with user
	When On audit page
	Then Audit page is loaded
	Then Verify audit page

@auditpgmp @Qa @Can @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to view required fields for PgMP
   Given Login with user
	When On audit page
	Then Audit page is loaded
	 And Verify audit page

@auditpmpdocumentupload @Qa @Can @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to upload education documnets in audit page for PMP
   Given Login with user
	When On audit page
	Then Audit page is loaded
	 And Verify audit page
	When Upload education document
	Then Verify the uploaded document
	When Add reference details
	Then Verify the reference details

@auditpmpsubmitbutton @Qa @Can @local @timeout:30 @debug @browser:Chrome-Headless
Scenario: Ensure user is able to view submit audit fields for PMP
   Given Login with user
	When On audit page
	Then Audit page is loaded
	 And Verify the uploaded document
	 And Verify the provided reference details
	 And Verify submit button is enabled