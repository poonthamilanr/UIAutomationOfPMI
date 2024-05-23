import { combineReducers } from 'redux';
import applicationReducer from "./Application/reducers";
import applicationFlowReducer from "./ApplicationFlow/reducers";
import { nameOnIdentificationReducer } from "./Name/reducers";
import { nameOnCertificateReducer } from "./NameOnCertificate/reducers";
import academicEducationReducer from "./AcademicEducation/reducers";
import professionalEducationReducer from "./ProfessionalEducation/reducers";
import experienceReducer from "./Experience/reducers";
import addressReducer from "./Address/reducers";
import experienceSummariesReducer from "./ExperienceSummaries/reducers";

import paymentInfoReducer from "./PaymentInfo/reducers";
import examReducer from "./Exam/reducers";
import examLocationReducer from "./ExamLocation/reducers";
import auditDocumentReducer from "./AuditDocument/reducers";

export const applicationInfoReducers = {
  application: combineReducers({
    application: applicationReducer,
    applicationFlow: applicationFlowReducer,
    nameOnIdentification: nameOnIdentificationReducer,
    nameOnCertificate: nameOnCertificateReducer,
    academicEducation: academicEducationReducer,
    professionalEducation: professionalEducationReducer,
    experience: experienceReducer,
    address: addressReducer,
    exams: examReducer,
    examLocation: examLocationReducer,
    experienceSummaries: experienceSummariesReducer,
    paymentInfo: paymentInfoReducer,
    auditDocument: auditDocumentReducer,
  }),
};
