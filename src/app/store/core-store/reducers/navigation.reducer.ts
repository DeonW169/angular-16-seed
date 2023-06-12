import { NavActions, NavActionTypes } from '../actions/navigation.actions';

export interface NavState {
  authorisedNavItems: any[];
}

const initialState: NavState = {
  authorisedNavItems: [],
};

export function reducer(state = initialState, action: NavActions): NavState {
  switch (action.type) {
    case NavActionTypes.SET_AUTHORISED_NAVS:
      return {
        ...state,
        authorisedNavItems: action.navs,
      };

    case NavActionTypes.CLEAR_AUTHORISED_NAVS:
      return {
        ...state,
        authorisedNavItems: [],
      };

    default:
      return state;
  }
}
