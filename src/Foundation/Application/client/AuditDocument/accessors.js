import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getAuditDocument = state => state.application.auditDocument.entity;

export const getAuditDocumentStatus = state => state.application.auditDocument.status;

export const getIsSavingStatus = state => getAuditDocumentStatus(state) === ApiStatus.Submitting;
