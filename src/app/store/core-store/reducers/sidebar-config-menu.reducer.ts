import {
  SidebarActions,
  SidebarActionTypes,
} from '../actions/sidebar-config-menu.actions';

export interface SidebarState {
  closeOnClickOutside: boolean;
  opened: boolean;
  sidebarContentType: string;
  sidebarContent: any;
  showSidebarSettings: boolean;
  triggerRerender: boolean;
}

const initialState: SidebarState = {
  closeOnClickOutside: true,
  opened: false,
  sidebarContentType: '',
  sidebarContent: null,
  showSidebarSettings: false,
  triggerRerender: false,
};

export function reducer(
  state = initialState,
  action: SidebarActions
): SidebarState {
  switch (action.type) {
    case SidebarActionTypes.SIDEBAR_TOGGLE_CLOSE_ONCLICK_OUTSIDE: {
      return {
        ...state,
        closeOnClickOutside: action.payload,
      };
    }

    case SidebarActionTypes.SIDEBAR_OPEN: {
      return {
        ...state,
        opened: true,
      };
    }

    case SidebarActionTypes.SIDEBAR_CLOSE: {
      return {
        ...state,
        opened: false,
      };
    }

    case SidebarActionTypes.SIDEBAR_SET_CONTENT: {
      return {
        ...state,
        sidebarContent: action.content,
        showSidebarSettings: false,
      };
    }

    default: {
      return state;
    }
  }
}
