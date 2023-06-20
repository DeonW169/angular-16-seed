import { NavActions, NavActionTypes } from '../actions/navigation.actions';

export interface NavState {
  authorizedNavItems: any[];
}

const initialState: NavState = {
  authorizedNavItems: [],
};

export function reducer(state = initialState, action: NavActions): NavState {
  switch (action.type) {
    case NavActionTypes.SET_AUTHORISED_NAVS:
      return {
        ...state,
        authorizedNavItems: action.navs,
      };

    case NavActionTypes.CLEAR_AUTHORISED_NAVS:
      return {
        ...state,
        authorizedNavItems: [],
      };

    default:
      return state;
  }
}
