import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RootState } from 'src/app/root-store/root-state';
import { } from ".."
import * as auth from '../reducers/auth.reducers';

import { MainStoreState } from "../state";
import { mainAppFeatureKey } from '../../store-constants';

const getAuthState = createFeatureSelector<RootState, MainStoreState>(mainAppFeatureKey);

export const isUserAuthenticatedState = (state: auth.State) => state.isAuthenticated;

export const getCurrentUser = createSelector(
    getAuthState,
    state => state.auth.currentUser
);

export const getUserAuth = createSelector(
    isUserAuthenticatedState,
    isAuthenticated => isAuthenticated
);

export const getEditCurrentUserLoading = createSelector(
    getAuthState,
    state => state.auth.updateUserLoading
);

export const getEditCurrentUserError = createSelector(
    getAuthState,
    state => state.auth.updateUserError
);

export const getEditCurrentUserSuccess = createSelector(
    getAuthState,
    state => state.auth.updateUserSuccess
);

export const getAuthLoading = createSelector(
    getAuthState,
    state => state.auth.logInLoading
);

export const getAuthError = createSelector(
    getAuthState,
    state => state.auth.logInError
);

export const getAuthMeaasage = createSelector(
    getAuthState,
    state => state.auth.message
);