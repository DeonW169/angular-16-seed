import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainStoreState } from '../state';
import { RootState } from '../../state';
import { mainAppFeatureKey } from '../../store-constants';

export const featureKey = mainAppFeatureKey;

export const getNavFeatureState = createFeatureSelector<
  RootState,
  MainStoreState
>(featureKey);

export const getAuthorisedNavItems = createSelector(
  getNavFeatureState,
  (state: MainStoreState) => state.nav.authorisedNavItems
);
