import * as nav from './reducers/navigation.reducer';
import * as sidebar from './reducers/sidebar-config-menu.reducer';

export interface CoreStoreState {
  nav: nav.NavState;
  sidebar: sidebar.SidebarState;
}

export const reducers = {
  nav: nav.reducer,
  sidebar: sidebar.reducer,
};
