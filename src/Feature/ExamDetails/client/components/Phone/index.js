import React from 'react';
import { connect } from 'react-redux';
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import {
  getEditPhones,
  getPhonesStatus,
  getPrimaryPhone,
} from 'foundation/Profile/client/Phone/accessors';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

import { getIsOpen } from './accessors';
import PhoneView from "./view";
import PhoneEdit from "./edit";

class Phone extends React.PureComponent {
  render() {
    const { phones, primaryPhone, apiStatus, isOpen, fields, isValidExamLocation } = this.props;

    if (!fields) {
      return <div className="static-height"/>;
    }
    const viewPhone = primaryPhone || phones[0];

    return isOpen && isValidExamLocation
      ? <PhoneEdit phones={phones} saving={apiStatus === ApiStatus.Submitting} fields={fields} />
      : <PhoneView phone={viewPhone} fields={fields} />
  }
}

const mapStateToProps = state => ({
  phones: getEditPhones(state),
  primaryPhone: getPrimaryPhone(state),
  apiStatus: getPhonesStatus(state),
  isOpen: getIsOpen(state),
  isValidExamLocation: getLocationStatus(state),
});

export default connect(mapStateToProps, null)(Phone);
