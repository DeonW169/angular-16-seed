import * as auth from './reducers/auth.reducers';

export interface AuthStoreState {
  auth: auth.State;
}

export const reducers = {
  auth: auth.reducer,
};
