import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

const typeIs = type => phone => phone.PhoneNumberType === type;

export const getPhones = state =>
  state.profile.phones.entity ? state.profile.phones.entity : undefined;

export const getEditPhones = state => {
  const phones = getPhones(state) || [];
  const mobilePhones = phones.filter(typeIs('Cell'));
  const homePhones = phones.filter(typeIs('Home'));
  const workPhones = phones.filter(typeIs('Work'));

  return [].concat(
    mobilePhones.length > 0 ? mobilePhones : [{PhoneNumberType: 'Cell'}],
    homePhones.length > 0 ? homePhones : [{PhoneNumberType: 'Home'}],
    workPhones.length > 0 ? workPhones : [{PhoneNumberType: 'Work'}],
  );
};

export const getPrimaryPhone = state =>
  state.profile.phones.entity ? state.profile.phones.entity.find(phone => phone.isPrimary) : undefined;

export const getPhonesStatus = state =>
  state.profile.phones ? state.profile.phones.status : ApiStatus.Idle;
