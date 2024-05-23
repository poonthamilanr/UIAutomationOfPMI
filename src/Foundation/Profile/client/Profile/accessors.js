import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

const extractReference = (links, name) => links && links[name] && links[name].href;

export const getProfile = state =>
  state.profile.profile ? state.profile.profile.entity : undefined;

export const getProfileStatus = state =>
  state.profile.profile ? state.profile.profile.status : ApiStatus.Idle;

export const getProfileRequestIdle = state => getProfileStatus(state) === ApiStatus.Idle;

export const getProfileApi = state =>
  getProfile(state) && getProfile(state)._links.self.href;

export const getCountryOrigin = state =>  getProfile(state) && getProfile(state).countryOrigin;

export const getEmbedded = state =>  getProfile(state) && getProfile(state)._embedded;

export const getProfileAcademicEducationApi = state =>
  getProfile(state) && extractReference(getProfile(state)._links, 'academicEducation');

export const getProfileAddresses = state =>
  getProfile(state) && getEmbedded(state).Addresses.resources
    ? getEmbedded(state).Addresses.resources
    : undefined;

export const getProfileAddressPreferences = state =>
  getProfile(state) && getEmbedded(state).AddressPreferences.resources
    ? getEmbedded(state).AddressPreferences.resources
    : undefined;

export const getProfileHomeAddressesPreferences = state =>
  getProfileAddressPreferences(state) && getProfileAddressPreferences(state).find(pref => pref.addressTypeEnum === 'Home');

export const getProfileHomeAddresses = state => {
  const isHome = pref => pref.addressTypeEnum === 'Home';
  const homePref = getProfileAddressPreferences(state) && getProfileAddressPreferences(state).find(isHome);
  return homePref && homePref.address;
}

export const getProfileCountry = state =>
  getProfile(state) && getProfile(state).country
    ? getProfile(state).country
    : undefined;

export const getAddressApi = state =>
  getProfile(state) && extractReference(getEmbedded(state).Addresses._links, 'self');

export const getAddressPreferredApi = state =>
  getProfile(state) && extractReference(getEmbedded(state).Addresses._links, 'preferred');

export const getProfileEmail = state => {
  if(getProfile(state) && getEmbedded(state).Emails.resources[0])
  {
    if(getEmbedded(state).Emails.resources.some(res => res.isPrimary))
    {
      return getEmbedded(state).Emails.resources.find(res => res.isPrimary);
    }
    return getEmbedded(state).Emails.resources[0];
  }
  return undefined;
}

export const getEmailsApi = state =>
  getProfile(state) && extractReference(getEmbedded(state).Emails._links, 'self');

export const getProfilePhones = state =>
  getProfile(state) && getEmbedded(state).PhoneNumbers.resources
    ? getEmbedded(state).PhoneNumbers.resources
    : undefined;

export const getProfilePhonesApi = state =>
  getProfile(state) && extractReference(getEmbedded(state).PhoneNumbers._links, 'self');


