import React from 'react';
import { connect } from 'react-redux';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import {
  getNameOnIdentification,
  getNameOnIdentificationStatus,
} from 'foundation/Application/client/Name/accessors';
import { getIsOpen } from './accessors';
import NameView from "./view";
import NameEdit from "./edit";

class Name extends React.PureComponent {
  render() {
    const { nameOnIdentification, nameOnCertificate, apiIdentificationStatus, apiCertificateStatus, isOpen, fields, isValidExamLocation } = this.props;

    if (!fields) {
      return <div className="static-height"/>;
    }

    const identificationModal = {
      body: fields && fields.IdentificationModalBody,
      title: fields && fields.IdentificationModalTitle,
    }

    return isOpen && isValidExamLocation
      ? <NameEdit
        nameOnIdentification={nameOnIdentification}
        nameOnCertificate={nameOnCertificate}
        identificationModal={identificationModal}
        saving={(apiIdentificationStatus === ApiStatus.Submitting) && (apiCertificateStatus === ApiStatus.Submitting)}
        fields={fields}
      />
      : <NameView nameOnIdentification={nameOnIdentification} nameOnCertificate={nameOnCertificate} fields={fields} />
  }
}

const mapStateToProps = state => ({
  nameOnIdentification: getNameOnIdentification(state),
  apiIdentificationStatus: getNameOnIdentificationStatus(state),
  isOpen: getIsOpen(state),
  isValidExamLocation: getLocationStatus(state),
});

export default connect(mapStateToProps, null)(Name);
