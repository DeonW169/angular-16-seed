import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainStoreState } from '../state';
import { RootState } from '../../state';
import { mainAppFeatureKey } from '../../store-constants';

export const featureKey = mainAppFeatureKey;

const getSidebarState = createFeatureSelector<RootState, MainStoreState>(
  featureKey
);

export const getCloseOnclickOutsideState = createSelector(
  getSidebarState,
  (state) => state.sidebar.closeOnClickOutside
);

export const getSidebarOpenedState = createSelector(
  getSidebarState,
  (state) => state.sidebar.opened
);

export const getSidebarContent = createSelector(
  getSidebarState,
  (state) => state.sidebar.sidebarContent
);

export const getSidebarContentType = createSelector(
  getSidebarState,
  (state) => state.sidebar.sidebarContentType
);

export const getSidebarShowSettings = createSelector(
  getSidebarState,
  (state) => state.sidebar.showSidebarSettings
);

export const getSidebarTriggerRerender = createSelector(
  getSidebarState,
  (state) => state.sidebar.triggerRerender
);
