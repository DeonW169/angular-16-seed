import { PortalActions, PortalActionTypes } from '../actions/portal.actions';

export interface PortalState {
  authorisedPortalItems: any[];
  showPortalMenu: boolean;
}

const initialState: PortalState = {
  authorisedPortalItems: [],
  showPortalMenu: false
};

export function reducer(state = initialState, action: PortalActions): PortalState {

  switch (action.type) {

    case PortalActionTypes.SET_AUTHORISED_PORTALS:
      return {
        ...state,
        authorisedPortalItems: action.portals
      };

    case PortalActionTypes.CLEAR_AUTHORISED_PORTALS:
      return {
        ...state,
        authorisedPortalItems: []
      };

    default:
      return state;

  }
}

