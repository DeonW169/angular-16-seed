import { Action } from '@ngrx/store';

export enum SidebarActionTypes {
  SIDEBAR_TOGGLE_CLOSE_ONCLICK_OUTSIDE = '[Sidebar] Toggle close sidebar onclick anywhere outside',
  SIDEBAR_OPEN = '[Sidebar] Open sidebar',
  SIDEBAR_CLOSE = '[Sidebar] Close sidebar',
  SIDEBAR_SET_CONTENT = '[Sidebar] Set content',
}

export class ToggleSidebarOnclickOutside implements Action {
  readonly type = SidebarActionTypes.SIDEBAR_TOGGLE_CLOSE_ONCLICK_OUTSIDE;

  constructor(public payload: boolean) {}
}

export class OpenSidebar implements Action {
  readonly type = SidebarActionTypes.SIDEBAR_OPEN;

  constructor() {}
}

export class CloseSidebar implements Action {
  readonly type = SidebarActionTypes.SIDEBAR_CLOSE;

  constructor() {}
}

export class SetSidebarContent implements Action {
  readonly type = SidebarActionTypes.SIDEBAR_SET_CONTENT;

  constructor(public content: any) {}
}

export type SidebarActions =
  | ToggleSidebarOnclickOutside
  | OpenSidebar
  | CloseSidebar
  | SetSidebarContent;
