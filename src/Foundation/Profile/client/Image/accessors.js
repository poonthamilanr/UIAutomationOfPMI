export const getProfileImage = state =>
  state.profile.image ? state.profile.image.entity : undefined;

export const getProfileImageUrl = state =>
  getProfileImage(state) ? getProfileImage(state).imageUrl : undefined;
