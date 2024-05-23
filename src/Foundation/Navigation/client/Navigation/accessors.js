export const getNavigation = state =>
  state.navigation.navigation ? state.navigation.navigation.entity : undefined;

export const getAccountMenuItems = state =>
  getNavigation(state) ? getNavigation(state).accountMenuItems : undefined;

export const getLogoutAccountMenuItem = state =>
  getAccountMenuItems(state) ? getAccountMenuItems(state).find(i => i.type === "Logout") : undefined;
