import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreStoreState } from '../state';
import { RootState } from '../../state';
import { mainAppFeatureKey } from '../../store-constants';

export const featureKey = mainAppFeatureKey;

export const getNavFeatureState = createFeatureSelector<
  RootState,
  CoreStoreState
>(featureKey);

export const getAuthorizedNavItems = createSelector(
  getNavFeatureState,
  (state: CoreStoreState) => state.nav.authorizedNavItems
);
