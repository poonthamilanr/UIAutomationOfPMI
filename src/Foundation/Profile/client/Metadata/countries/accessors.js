import { ApiStatus } from "foundation/CertificationApiCore/client/constants";

export const getCountriesInfo = state => state.metadata.countries;

export const getAllCountries = info => info ? info.all.entity : undefined;

export const getFilteredCountries = info => info ? info.filtered.entity : undefined;

export const getAllCountriesStatus = info => info ? info.all.status : ApiStatus.Idle;

export const getFilteredCountriesStatus = info => info ? info.filtered.status : ApiStatus.Idle;

export const getFilteredStatesStatus = info => info &&  info.filteredState ? info.filteredState.status : ApiStatus.Idle;

export const getFilteredStates = info => info &&  info.filteredState ? info.filteredState.entity : undefined;