import React from 'react';
import { connect } from 'react-redux';
import { Button, LinkButton } from '@pmi/dsm-react-bs4';
import IconPencil from '@pmi/dsm-react-bs4/dist/components/icons/16/PencilIcon';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { getLocationStatus } from 'feature/ExamDetails/client/components/ExamDetails/accessors';
import i18n from 'i18next';
import * as pageActions from "../ExamDetails/actions";

class PhoneView extends React.Component {

  getDisplayPhoneNumber(phone) {
    const countryCode = phone.phoneCountryCode || '';
    const areaCode = phone.phoneAreaCode || '';
    const number = phone.phoneNumber || '';
    return countryCode && (areaCode || number) ? `+${countryCode} ${areaCode}${number}` : '';
  }

  getDisplayPhoneExtension(phone) {
    return phone.phoneExtension || '';
  }

  getDisplayPhoneType(phone) {
    const { fields } = this.props;
    const phoneType = phone.PhoneNumberType;

    switch (phoneType) {
    case 'Cell': return fields.PhoneNumberTypeCell.value;
    case 'Home': return fields.PhoneNumberTypeHome.value;
    case 'Work': return fields.PhoneNumberTypeWork.value;
    default : return phoneType ? `${phoneType}` : '';
    }
  }

  render() {
    const { phone, openForm, fields, isValidExamLocation } = this.props;
    const phoneNumber = phone && this.getDisplayPhoneNumber(phone);
    const phoneExtension = phone && this.getDisplayPhoneExtension(phone);
    const phoneType = phone && this.getDisplayPhoneType(phone).toLowerCase();
    const hasValue = val => val;
    const cssClass = isValidExamLocation ? "view-mode" : "view-mode disable-view";

    return (
      <div className={cssClass}>
        <div className="view-mode__exam">
          <h2><Text field={fields.ViewModeTitle} /></h2>
          {[
            phoneNumber,
            phoneExtension && `${fields.ViewModeExtensionOptionalKey.value}:${phoneExtension}`,
            phoneType && `(${phoneType})`,
          ].filter(hasValue).join(' ')}
        </div>
        {phone.phoneNumber && (
          <>
            <LinkButton
              className="with-icon link-base d-none d-md-flex"
              onClick={openForm}
              icon={IconPencil}
              titleText={i18n.t('cert-app.ExamDetails.Phone.EditPhone')}
            />
            <Button
              variant="outline-primary"
              className="d-md-none mt-2"
              onClick={openForm}
              titleText={i18n.t('cert-app.ExamDetails.Phone.EditPhone')}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isValidExamLocation: getLocationStatus(state),
});

const mapDispatchToProps = dispatch => ({
  openForm: () => dispatch(pageActions.openForm('phone')),
});

const phoneView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneView);

export default phoneView;
