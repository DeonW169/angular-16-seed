import { User } from '../../../models/user';
import { All, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  currentUser: User;
  alertType: string | null;
  message: string | null;
  loading: boolean;
  error: boolean;
  token: string;
  userLoading: boolean;
  userError: boolean;

  logInLoading: boolean;
  logInError: boolean;

  updateUserLoading: boolean;
  updateUserError: boolean;
  updateUserSuccess: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
  currentUser: {
    id: '',
    username: '',
    role: ''
  },
  alertType: null,
  message: null,
  loading: false,
  error: false,
  token: '',
  userLoading: false,
  userError: false,
  logInLoading: false,
  logInError: false,
  updateUserLoading: false,
  updateUserError: false,
  updateUserSuccess: false,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        logInLoading: true
      };
    }

    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        alertType: 'success',
        message: 'Login Success',
        logInLoading: false,
        logInError: false
      };
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        alertType: 'error',
        message: action.payload,
        logInLoading: false,
        logInError: true
      };
    }

    case AuthActionTypes.SESSION_LOGOUT_SUCCESS: {
      return {
        ...state,
        alertType: 'info',
        message: action.payload.message,
      };
    }

    case AuthActionTypes.GET_CURRENT_USER: {
      return {
        ...state,
        userLoading: true,
        userError: false
      };
    }

    case AuthActionTypes.GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUser: {
          id: action.payload.id,
          username: action.payload.username,
          role: action.payload.role,
          isSuperuser: action.payload.isSuperuser,
          isStaff: action.payload.isStaff,
          groups: action.payload.groups,
          customer: action.payload.customer,
        },
        userLoading: false,
        userError: false
      };
    }

    case AuthActionTypes.GET_CURRENT_USER_FAILURE: {
      return {
        ...state,
        message: action.error.error,
        userLoading: false,
        userError: true
      };
    }

    case AuthActionTypes.EDIT_CURRENT_USER: {
      return {
        ...state,
        updateUserLoading: true,
        updateUserError: false
      };
    }

    case AuthActionTypes.EDIT_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUser: {
          id: action.payload.id,
          username: action.payload.username,
          role: action.payload.role,
          isSuperuser: action.payload.isSuperuser,
          isStaff: action.payload.isStaff,
          groups: action.payload.groups,
          customer: action.payload.customer,
        },
        updateUserLoading: false,
        updateUserError: false,
        updateUserSuccess: true
      };
    }

    case AuthActionTypes.EDIT_CURRENT_USER_FAILURE: {
      return {
        ...state,
        updateUserLoading: false,
        updateUserError: true
      };
    }

    default: {
      return state;
    }
  }
}

