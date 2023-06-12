import { AuthStoreState } from "./auth-store/state";
import { CoreStoreState } from "./core-store/state";
import { AppStoreState } from "./app-store/state";

export interface RootState {
  mainApp: AppStoreState;
  authApp: AuthStoreState;
  coreApp: CoreStoreState;
}
