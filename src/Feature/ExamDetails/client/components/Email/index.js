import React from 'react';
import { connect } from 'react-redux';
import { getEmail, getEmailStatus } from 'foundation/Profile/client/Email/accessors';
import { ApiStatus } from "foundation/CertificationApiCore/client/constants";
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import { getIsOpen } from './accessors';
import EmailView from "./view";
import EmailEdit from "./edit";

class Email extends React.PureComponent {
  render() {
    const { data, apiStatus, isOpen, fields, isValidExamLocation } = this.props;

    if (!fields) {
      return <div className="static-height"/>;
    }

    return isOpen && isValidExamLocation
      ? <EmailEdit email={data ? data.address : ''} saving={apiStatus === ApiStatus.Submitting} fields={fields} />
      : <EmailView email={data ? data.address : ''} fields={fields} />
  }
}

const mapStateToProps = state => ({
  data: getEmail(state),
  apiStatus: getEmailStatus(state),
  isOpen: getIsOpen(state),
  isValidExamLocation: getLocationStatus(state),
});

const email = connect(mapStateToProps, null)(Email);

export default email;
