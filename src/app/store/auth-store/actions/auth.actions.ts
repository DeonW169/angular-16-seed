import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  LOGOUT = "[Auth] Logout",
  SESSION_LOGOUT_SUCCESS = "[Auth] Session Logout Success",
  SESSION_EXPIRED = "[Auth] Session Expired",

  USER_ACCESS_TYPES = "[Auth] Get user access types",
  USER_ACCESS_TYPES_SUCCESS = "[Auth] Get user types success",
  USER_ACCESS_TYPES_FAILURE = "[Auth] Get user types failure",

  GET_CURRENT_USER = "[Auth] Get current user",
  GET_CURRENT_USER_SUCCESS = "[Auth] Get current user success",
  GET_CURRENT_USER_FAILURE = "[Auth] Get current user failure",

  EDIT_CURRENT_USER = "[Auth] Edit current user",
  EDIT_CURRENT_USER_SUCCESS = "[Auth] Edit current user success",
  EDIT_CURRENT_USER_FAILURE = "[Auth] Edit current user failure",
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() { }
}

export class SessionLogoutSuccess implements Action {
  readonly type = AuthActionTypes.SESSION_LOGOUT_SUCCESS;
  constructor(public payload: any) { }
}

export class SessionExpired implements Action {
  readonly type = AuthActionTypes.SESSION_EXPIRED;
  constructor() { }
}

export class UserAccessTypes implements Action {
  readonly type = AuthActionTypes.USER_ACCESS_TYPES;
  constructor(public payload: any) { }
}

export class UserAccessTypesSuccess implements Action {
  readonly type = AuthActionTypes.USER_ACCESS_TYPES_SUCCESS;
  constructor(public payload: any) { }
}

export class UserAccessTypesFailure implements Action {
  readonly type = AuthActionTypes.USER_ACCESS_TYPES_FAILURE;
  constructor(public payload: any) { }
}

export class GetCurrentUser implements Action {
  readonly type = AuthActionTypes.GET_CURRENT_USER;
  constructor() { }
}

export class GetCurrentUserSuccess implements Action {
  readonly type = AuthActionTypes.GET_CURRENT_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class GetCurrentUserFailure implements Action {
  readonly type = AuthActionTypes.GET_CURRENT_USER_FAILURE;
  constructor(public error: any) { }
}

export class EditCurrentUser implements Action {
  readonly type = AuthActionTypes.EDIT_CURRENT_USER;
  constructor(public payload: any, public id: string) { }
}

export class EditCurrentUserSuccess implements Action {
  readonly type = AuthActionTypes.EDIT_CURRENT_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class EditCurrentUserFailure implements Action {
  readonly type = AuthActionTypes.EDIT_CURRENT_USER_FAILURE;
  constructor(public error: any) { }
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | LogOut
  | SessionExpired
  | SessionLogoutSuccess
  | UserAccessTypes
  | UserAccessTypesSuccess
  | UserAccessTypesFailure
  | GetCurrentUser
  | GetCurrentUserSuccess
  | GetCurrentUserFailure
  | EditCurrentUser
  | EditCurrentUserSuccess
  | EditCurrentUserFailure;
