import React from 'react';
import { connect } from 'react-redux';
import { getAddressStatus as getAddressProfileStatus } from 'foundation/Profile/client/Address/accessors';
import { getIdentificationAddressStatus as getAddressAppStatus, getIdentificationAddress } from 'foundation/Application/client/Address/accessors';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import { getIsOpen } from './accessors';
import AddressView from "./view";
import AddressEdit from "./edit";

class Address extends React.PureComponent {
  render() {
    const { apiProfileStatus, apiAppStatus, isOpen, fields, examAddress, isValidExamLocation } = this.props;

    if (!fields) {
      return <div className="static-height"/>;
    }
    return isOpen && isValidExamLocation
      ? <AddressEdit examAddress={examAddress} saving={(apiProfileStatus === ApiStatus.Submitting) || (apiAppStatus === ApiStatus.Submitting)} fields={fields}/>
      : <AddressView address={examAddress} fields={fields} />
  }
}

const mapStateToProps = state => ({
  apiProfileStatus: getAddressProfileStatus(state),
  apiAppStatus: getAddressAppStatus(state),
  isOpen: getIsOpen(state),
  examAddress: getIdentificationAddress(state),
  isValidExamLocation: getLocationStatus(state),
});

const address = connect(mapStateToProps, null)(Address);

export default address;
