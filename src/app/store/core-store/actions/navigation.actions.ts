import { Action } from '@ngrx/store';
import { NavItem } from 'src/app/models/NavItem';

export enum NavActionTypes {
  SET_AUTHORISED_NAVS = '[Navigation] Set authorised nav items',
  GET_AUTHORISED_NAVS = '[Navigation] Get authorised nav items',
  CLEAR_AUTHORISED_NAVS = '[Navigation] Clear authorised nav items',
}

export class SetAuthorisedNavs implements Action {
  readonly type = NavActionTypes.SET_AUTHORISED_NAVS;

  constructor(public navs: NavItem[]) {}
}

export class GetAuthorisedNavs implements Action {
  readonly type = NavActionTypes.GET_AUTHORISED_NAVS;

  constructor(public navs: NavItem[]) {}
}

export class ClearAuthorisedNavs implements Action {
  readonly type = NavActionTypes.CLEAR_AUTHORISED_NAVS;

  constructor() {}
}

export type NavActions =
  | SetAuthorisedNavs
  | GetAuthorisedNavs
  | ClearAuthorisedNavs;