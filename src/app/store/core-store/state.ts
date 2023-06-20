import * as nav from './reducers/navigation.reducer';
import * as sidebar from './reducers/sidebar-config-menu.reducer';
import * as portal from "./reducers/portal.reducer";

export interface CoreStoreState {
  nav: nav.NavState;
  sidebar: sidebar.SidebarState;
  portal: portal.PortalState;
}

export const reducers = {
  nav: nav.reducer,
  sidebar: sidebar.reducer,
  portal: portal.reducer,
};
