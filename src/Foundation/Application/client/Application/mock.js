export default {
  "personId": 752250,
  "certificationId": 0,
  "certificationTypeEnum": "PMI_PBA",
  "applicationStatusEnum": "Audit",
  "auditStatusEnum": "NotOpen",
  "agreementAccepted": false,
  "adminRequestedAudit": false,
  "adminCreatedApplication": false,
  "dateOpened": "2019-12-11T08:33:45.247",
  "dateSubmitted": "2019-12-12T17:06:21.9292223+00:00",
  "datePendingNotification": "2019-12-11T08:33:45.247",
  "dateAuditDue": "2020-04-18T00:00:00",
  "applicationResubmitted": 0,
  "auditDueExtended": false,
  "nameToBeOnApplication": "Name on Certificate",
  "auditDocuments": [
    {
      "applicationId": 5014289,
      "objectId": -1,
      "documentReceived": true,
      "inactive": false,
      "auditReferenceRequest": null,
      "id": 343278,
      "documentContent": "",
      "documentMetadata": {},
      "auditDocumentTypeEnum": "AcademicEducation",
      "_links": {
        "self": {
          "href": "/api/Audit/343278",
          "allowed": [
            "Get",
            "Delete",
          ],
        },
        "AuditDocument": {
          "href": "/api/Audit/AuditDocument/343278",
          "allowed": [
            "Get",
            "Post",
          ],
        },
      },
    },
    {
      "applicationId": 5014289,
      "objectId": 14057045,
      "documentReceived": true,
      "inactive": false,
      "auditReferenceRequest": null,
      "id": 343279,
      "documentContent": "",
      "documentMetadata": {},
      "auditDocumentTypeEnum": "ProfessionalExperience",
      "_links": {
        "self": {
          "href": "/api/Audit/343279",
          "allowed": [
            "Get",
            "Delete",
          ],
        },
      },
    },
    {
      "applicationId": 5014289,
      "objectId": 14057146,
      "documentReceived": true,
      "inactive": false,
      "auditReferenceRequest": null,
      "id": 343280,
      "documentContent": "",
      "documentMetadata": {},
      "auditDocumentTypeEnum": "ProfessionalExperience",
      "_links": {
        "self": {
          "href": "/api/Audit/343280",
          "allowed": [
            "Get",
            "Delete",
          ],
        },
      },
    },
    {
      "applicationId": 5014289,
      "objectId": 6829919,
      "documentReceived": false,
      "inactive": false,
      "auditReferenceRequest": null,
      "id": 343281,
      "documentContent": "",
      "documentMetadata": {},
      "auditDocumentTypeEnum": "ProfessionalEducation",
      "_links": {
        "self": {
          "href": "/api/Audit/343281",
          "allowed": [
            "Get",
            "Delete",
          ],
        },
        "AuditDocument": {
          "href": "/api/Audit/AuditDocument/343281",
          "allowed": [
            "Get",
            "Post",
          ],
        },
      },
    },
  ],
  "academicEducation": {
    "degreeEnum": "MastersDegree",
    "yearStarted": 1991,
    "yearOfDegree": 1992,
    "schoolName": "Georgia State University",
    "schoolAddress1": "PO Box 3965",
    "schoolAddress2": "",
    "schoolAddress3": "",
    "schoolCity": "Atlanta",
    "schoolState": "GA",
    "schoolPostalCode": "303023965",
    "schoolCountryCode": "USA",
    "fieldOfStudyEnum": "Finance",
  },
  "accreditedUniversityId": 0,
  "primaryReferralEnum": -1,
  "takenPrepCourseEnum": -1,
  "applicationCreateUser": "SYSTEM",
  "applicationVersionId": 8,
  "isActive": true,
  "isOpen": true,
  "isClosed": false,
  "isSubmitted": false,
  "isAccreditedUniversity": false,
  "_links": {
    "self": {
      "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/Applications/4938876",
      "allowed": [
        "Get",
        "Put",
      ],
    },
    "name": {
      "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/Applications/4938876/name",
      "allowed": [
        "Get",
        "Put",
      ],
    },
    "academicEducation": {
      "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/Applications/4938876/academicEducation",
      "allowed": [
        "Get",
        "Put",
      ],
    },
  },
  "_embedded": {
    "education": {
      "resources": [
        {
          "applicationId": 5022578,
          "courseEndDate": "2020-03-31T00:00:00",
          "courseStartDate": "2018-02-01T00:00:00",
          "courseTitle": "course title",
          "institution": "course provider",
          "hoursTotal": 40.00,
          "_links": {
            "self": {
              "href": "/api/Applications/5022578/education/6838581",
              "allowed": [
                "Get",
                "Put",
              ],
            },
          },
        },
        {
          "applicationId": 5022578,
          "courseEndDate": "2020-03-31T00:00:00",
          "courseStartDate": "2018-02-01T00:00:00",
          "courseTitle": "course title",
          "institution": "course provider",
          "hoursTotal": 40.00,
          "_links": {
            "self": {
              "href": "/api/Applications/5022578/education/6829919",
              "allowed": [
                "Get",
                "Put",
              ],
            },
          },
        },
      ],
      "_links": {
        "self": {
          "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/Applications/4938876/education",
          "allowed": [
            "Get",
            "Post",
          ],
        },
      },
    },
    "experience": {
      "resources": [
        {
          "applicationId": 5022567,
          "workExperienceTypeEnum": "Project",
          "projectTitle": "Project",
          "company": "project company",
          "jobTitle": "project job",
          "startDate": "2016-02-01T00:00:00",
          "endDate": "2016-06-30T00:00:00",
          "description": "Mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt",
          "primaryFocusTypeEnum": "Automotive",
          "primaryFocusTypeOther": "",
          "functionalAreaTypeEnum": "PMO",
          "functionalAreaTypeOther": "",
          "methodologyEnum": "Hybrid",
          "teamSizeEnum": "TwentyOrMore",
          "budgetRangeEnum": "TenToTwentyFiveMillion",
          "portfolioCount": 0,
          "directReports": 0,
          "pmReports": 0,
          "_links": {
            "self": {
              "href": "/api/Applications/5022567/experience/14076978",
              "allowed": [
                "Get",
                "Put",
              ],
            },
            "experience_audit_pdf": {
              "href": "https://webreports.erpint.pmi.org/certification/experienceaudit/6013137/14076978",
              "allowed": [
                "Get",
              ],
            },
          },
        },
        {
          "applicationId": 5022567,
          "workExperienceTypeEnum": "Portfolio",
          "projectTitle": "Portfolio project",
          "company": "Portfolio organiation",
          "jobTitle": "Portfolio job",
          "startDate": "2016-01-01T00:00:00",
          "endDate": "2020-01-31T00:00:00",
          "description": "Gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
          "primaryFocusTypeEnum": "Aerospace",
          "primaryFocusTypeOther": "",
          "functionalAreaTypeEnum": "CustomerService",
          "functionalAreaTypeOther": "",
          "methodologyEnum": "Agile",
          "teamSizeEnum": "FiveToNine",
          "budgetRangeEnum": "TenToTwentyFiveMillion",
          "portfolioCount": 1,
          "directReports": 0,
          "pmReports": 0,
          "_links": {
            "self": {
              "href": "/api/Applications/5022567/experience/14077002",
              "allowed": [
                "Get",
                "Put",
              ],
            },
            "experience_audit_pdf": {
              "href": "https://webreports.erpint.pmi.org/certification/experienceaudit/6013137/14077002",
              "allowed": [
                "Get",
              ],
            },
          },
        },
        {
          "applicationId": 5022567,
          "workExperienceTypeEnum": "Program",
          "projectTitle": "Program title",
          "company": "Program organiation",
          "jobTitle": "Program job",
          "startDate": "2016-01-01T00:00:00",
          "endDate": "2020-01-31T00:00:00",
          "description": "Gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
          "primaryFocusTypeEnum": "Aerospace",
          "primaryFocusTypeOther": "",
          "functionalAreaTypeEnum": "CustomerService",
          "functionalAreaTypeOther": "",
          "methodologyEnum": "Agile",
          "teamSizeEnum": "FiveToNine",
          "budgetRangeEnum": "TenToTwentyFiveMillion",
          "portfolioCount": 1,
          "directReports": 0,
          "pmReports": 0,
          "_links": {
            "self": {
              "href": "/api/Applications/5022567/experience/14077003",
              "allowed": [
                "Get",
                "Put",
              ],
            },
            "experience_audit_pdf": {
              "href": "https://webreports.erpint.pmi.org/certification/experienceaudit/6013137/14077003",
              "allowed": [
                "Get",
              ],
            },
          },
        },
        {
          "applicationId": 5022567,
          "workExperienceTypeEnum": "Agile",
          "projectTitle": "Agile title",
          "company": "Agile organiation",
          "jobTitle": "Agile job",
          "startDate": "2016-01-01T00:00:00",
          "endDate": "2020-01-31T00:00:00",
          "description": "Gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
          "primaryFocusTypeEnum": "Aerospace",
          "primaryFocusTypeOther": "",
          "functionalAreaTypeEnum": "CustomerService",
          "functionalAreaTypeOther": "",
          "methodologyEnum": "Agile",
          "agileMethodologyEnum": "Kanban",
          "teamSizeEnum": "FiveToNine",
          "budgetRangeEnum": "TenToTwentyFiveMillion",
          "portfolioCount": 1,
          "directReports": 0,
          "pmReports": 0,
          "_links": {
            "self": {
              "href": "/api/Applications/5022567/experience/14077004",
              "allowed": [
                "Get",
                "Put",
              ],
            },
            "experience_audit_pdf": {
              "href": "https://webreports.erpint.pmi.org/certification/experienceaudit/6013137/14077004",
              "allowed": [
                "Get",
              ],
            },
          },
        },
        {
          "applicationId": 5022567,
          "workExperienceTypeEnum": "BusinessAnalysis",
          "projectTitle": "Business title",
          "company": "Business organiation",
          "jobTitle": "Business job",
          "startDate": "2016-01-01T00:00:00",
          "endDate": "2020-01-31T00:00:00",
          "description": "Gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu risus quis varius quam quisque id diam vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
          "primaryFocusTypeEnum": "Aerospace",
          "primaryFocusTypeOther": "",
          "functionalAreaTypeEnum": "CustomerService",
          "functionalAreaTypeOther": "",
          "methodologyEnum": "Agile",
          "teamSizeEnum": "FiveToNine",
          "budgetRangeEnum": "TenToTwentyFiveMillion",
          "portfolioCount": 1,
          "directReports": 0,
          "pmReports": 0,
          "_links": {
            "self": {
              "href": "/api/Applications/5022567/experience/14077005",
              "allowed": [
                "Get",
                "Put",
              ],
            },
            "experience_audit_pdf": {
              "href": "https://webreports.erpint.pmi.org/certification/experienceaudit/6013137/14077005",
              "allowed": [
                "Get",
              ],
            },
          },
        },
      ],
      "_links": {
        "self": {
          "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/Applications/4938876/experience",
          "allowed": [
            "Get",
            "Post",
          ],
        },
        "experience_audit_pdf": {
          "href": "https://webreports.erpint.pmi.org/certification/experienceaudit/6013137/4938876",
          "allowed": [
            "Get",
          ],
        },
      },
    },
    "experienceSummaries": {
      "resources": [

      ],
      "_links": {
        "self": {
          "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/Applications/4938876/experienceSummaries",
          "allowed": [
            "Get",
          ],
        },
      },
    },
    "exams": {
      "resources": [
        {
          "identification": {
            "name": {
              "firstName": "Name",
              "middleName": "M",
              "lastName": "Lastname",
            },
            "address": {
              "AddressType": "Work",
              "address1": "1923 Ardmore Rd NW",
              "city": "Atlanta",
              "state": "",
              "postalCode": "30309-1817",
              "countryCode": "PCN",
            },
          },
          "applicationId": 4938876,
          "examStatusEnum": "Pending",
          "examResolutionStatusEnum": "NotApplicable",
          "referenceOrderID": 0,
          "examRescoringStatus": 0,
          "examTypeEnum": "Unspecified",
          "examNotTakenReasonEnum": "NotApplicable",
          "passed": false,
          "examLanguageEnum": "English",
          "specialAccommodations": {
            "conditions": 0,
          },
          "eligibilityQueue": {
            "examSequence": 0,
            "examQueueStatusEnum": "NotQueued",
            "numberAttempts": 0,
            "suspended": false,
            "suspendedReason": "NotApplicable",
          },
          "adminIgnoreExam": false,
          "examVendorEnum": "None",
          "isPilotExam": false,
          "isActive": true,
          "isOpen": true,
          "isFailed": false,
          "isScheduled": false,
          "isEligible": false,
          "_links": {
            "self": {
              "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/Applications/4938876/exams/3345960",
              "allowed": [
                "Get",
                "Put",
              ],
            },
            "identification-name": {
              "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/applications/4938876/Exams/3345960/identification/name",
              "allowed": [
                "Get",
                "Put",
              ],
            },
            "identification-address": {
              "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/applications/4938876/Exams/3345960/identification/address",
              "allowed": [
                "Get",
                "Put",
              ],
            },
            "details": {
              "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/applications/4938876/Exams/3345960/details",
              "allowed": [
                "Put",
              ],
            },
          },
        },
      ],
      "_links": {
        "self": {
          "href": "https://cert-int-eastus-application-apiapp.azurewebsites.net/api/Applications/4938876/exams",
          "allowed": [
            "Get",
            "Post",
          ],
        },
      },
    },
  },
}
