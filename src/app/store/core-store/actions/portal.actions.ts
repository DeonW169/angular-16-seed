import { Action } from '@ngrx/store';

export enum PortalActionTypes {
  SET_AUTHORISED_PORTALS = '[Portal] Set authorised portals',
  CLEAR_AUTHORISED_PORTALS = '[Portal] Clear authorised portals',
}

export class SetAuthorisedPortals implements Action {
  readonly type = PortalActionTypes.SET_AUTHORISED_PORTALS;

  constructor(public portals: any[]) { }
}

export class ClearAuthorisedPortals implements Action {
  readonly type = PortalActionTypes.CLEAR_AUTHORISED_PORTALS;

  constructor() { }
}


export type PortalActions = SetAuthorisedPortals
  | ClearAuthorisedPortals;
