import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BvStoreState } from '../state';
import { RootState } from '../../root-state';
import { bvAppFeatureKey } from '../../root-store-constants';

export const featureKey = bvAppFeatureKey;

export const getPortalFeatureState = createFeatureSelector<RootState, BvStoreState>(featureKey);

export const getAuthorisedPortalItems = createSelector(
  getPortalFeatureState,
  (state: BvStoreState) => state.portal.authorisedPortalItems
);

export const getPortMenuVisibility = createSelector(
  getPortalFeatureState,
  (state: BvStoreState) => state.portal.showPortalMenu
);
