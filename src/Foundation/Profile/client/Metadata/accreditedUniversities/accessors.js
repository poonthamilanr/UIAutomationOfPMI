export const getAccreditedUniversities = state =>
  state.metadata.accreditedUniversities.entity;

export const getAccreditedUniversitiesStatus =
    state => state.metadata.accreditedUniversities.status;

export const getAccreditedUniversity = universityId => state =>
  getAccreditedUniversities(state) && getAccreditedUniversities(state)
    .find(university => university.id === universityId);

export const getAccreditedUniversityDegrees = universityId => state =>
  getAccreditedUniversity(universityId)(state) && getAccreditedUniversity(universityId)(state).degrees;