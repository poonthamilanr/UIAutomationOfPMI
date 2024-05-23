import React from 'react';
import { connect } from 'react-redux';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import {
  getNameOnCertificate,
  getNameOnCertificateStatus,
} from 'foundation/Application/client/NameOnCertificate/accessors';
import { getIsOpen } from './accessors';
import NameOnCertificateView from "./view";
import NameOnCertificateEdit from "./edit";

class NameOnCertificate extends React.PureComponent {
  render() {
    const { nameOnCertificate, apiIdentificationStatus, apiCertificateStatus, isOpen, fields, isValidExamLocation } = this.props;

    if (!fields) {
      return <div className="static-height"/>;
    }

    return isOpen && isValidExamLocation
      ? <NameOnCertificateEdit
        nameOnCertificate={nameOnCertificate}
        saving={(apiIdentificationStatus === ApiStatus.Submitting) && (apiCertificateStatus === ApiStatus.Submitting)}
        fields={fields}
      />
      : <NameOnCertificateView nameOnCertificate={nameOnCertificate} fields={fields} />
  }
}

const mapStateToProps = state => ({
  nameOnCertificate: getNameOnCertificate(state),
  apiCertificateStatus: getNameOnCertificateStatus(state),
  isOpen: getIsOpen(state),
  isValidExamLocation: getLocationStatus(state),
});

export default connect(mapStateToProps, null)(NameOnCertificate);
