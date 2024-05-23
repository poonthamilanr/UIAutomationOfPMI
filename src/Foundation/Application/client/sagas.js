import applicationSagaWatchers from "./Application/sagas";
import applicationFlowSagaWatchers from "./ApplicationFlow/sagas";
import nameSagaWatchers from "./Name/sagas";
import nameOnCertificateWatchers from "./NameOnCertificate/sagas";
import academicEducationSagaWatchers from "./AcademicEducation/sagas";
import professionalEducationSagaWatchers from "./ProfessionalEducation/sagas";
import addressSagaWatchers from "./Address/sagas";
import examSagaWatchers from "./Exam/sagas";
import examLocationSagaWatchers from "./ExamLocation/sagas";
import experienceSagaWatchers from "./Experience/sagas";
import experienceSummariesSagaWatchers from "./ExperienceSummaries/sagas";
import paymentInfoSagaWatchers from "./PaymentInfo/sagas";
import auditDocumentSagaWatchers from "./AuditDocument/sagas";

const applicationApiSagaWatchers = [
  ...applicationSagaWatchers,
  ...applicationFlowSagaWatchers,
  ...academicEducationSagaWatchers,
  ...professionalEducationSagaWatchers,
  ...experienceSagaWatchers,
  ...nameSagaWatchers,
  ...nameOnCertificateWatchers,
  ...examSagaWatchers,
  ...examLocationSagaWatchers,
  ...addressSagaWatchers,
  ...paymentInfoSagaWatchers,
  ...experienceSummariesSagaWatchers,
  ...auditDocumentSagaWatchers,
];

export default applicationApiSagaWatchers;
