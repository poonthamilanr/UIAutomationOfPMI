import profileSagaWatchers from "./Profile/sagas";
import addressSagaWatchers from "./Address/sagas";
import emailSagaWatchers from "./Email/sagas";
import phoneSagaWatchers from "./Phone/sagas";
import countriesSagaWatchers from "./Metadata/countries/sagas";
import accreditedUniversitiesSagaWatchers from "./Metadata/accreditedUniversities/sagas";
import providersSagaWatchers from "./Metadata/providers/sagas";
import coursesSagaWatchers from "./Metadata/courses/sagas";
import profileImageUrlSagaWatchers from "./Image/sagas";

const profileApiSagaWatchers = [
  /* Profile info */
  ...profileSagaWatchers,
  ...addressSagaWatchers,
  ...emailSagaWatchers,
  ...phoneSagaWatchers,
  ...profileImageUrlSagaWatchers,
  /* Metadata */
  ...countriesSagaWatchers,
  ...accreditedUniversitiesSagaWatchers,
  ...providersSagaWatchers,
  ...coursesSagaWatchers,
  // usStatesSagaWatchrs,
  // canadaProvincesSagaWatchers
];

export default profileApiSagaWatchers;
