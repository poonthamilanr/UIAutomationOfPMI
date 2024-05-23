import { getSitecoreContext } from 'foundation/Infrastructure/client/SitecoreContext/setSitecoreContext';

export function isPageSimulation() {
  const { pageState } = getSitecoreContext();
  return pageState && pageState !== 'normal';
}