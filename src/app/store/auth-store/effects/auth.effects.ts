import { HeaderService } from "../../../services/header.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  catchError,
  map,
  tap,
  switchMap,
} from "rxjs/operators";
import { Observable, of } from "rxjs";
import { HttpRequestService } from "../../../services/http-request.service";
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  UserAccessTypes,
  UserAccessTypesSuccess,
  UserAccessTypesFailure,
  SessionLogoutSuccess,
  SessionExpired,
  GetCurrentUser,
  GetCurrentUserSuccess,
  GetCurrentUserFailure, EditCurrentUserFailure, EditCurrentUserSuccess
} from "../actions/auth.actions";
import { EndPoints, AppRoutes } from "../../../shared/endpoints.enum";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { RootStoreState } from "../..";
import { TanToastrService } from "src/app/services/toastr.service";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private apiService: HttpRequestService,
    private router: Router,
    private storage: LocalStorageService,
    private store: Store<RootStoreState.RootState>,
    private headerService: HeaderService,
    private toaster: TanToastrService,
  ) { }

  @Effect()
  LogIn$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.apiService.postRequest(EndPoints.LOGIN, payload).pipe(
        map((result) => {
          if (result) {
            localStorage.setItem("token", result.token);
            this.headerService.setToken(true);

            return new LogInSuccess({ data: result });
          } else {
            return new LogInFailure({ error: result });
          }
        }),
        catchError((error) => {
          return of(new LogInFailure({ error: error }));
        })
      );
    })
  );

  @Effect()
  GetCurrentUser$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GET_CURRENT_USER),
    map((action: GetCurrentUser) => action),
    switchMap((payload) => {
      return this.apiService.getAllRequest(EndPoints.CURRENT_USER).pipe(
        map((result) => {
          return new GetCurrentUserSuccess(result);
        }),
        catchError((error) => {
          return of(new GetCurrentUserFailure({ error }));
        })
      );
    })
  );

  @Effect()
  EditCurrentUser$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.EDIT_CURRENT_USER),
    switchMap((action: any) => {
      return this.apiService.updateRequest(`${EndPoints.UPDATE}/${action.id}`, action.payload).pipe(
        map((res: any) => new EditCurrentUserSuccess(res.data)),
        catchError((error) => of(new EditCurrentUserFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  GetCurrentUserSuccess$: Observable<any> = this.actions$.pipe(
    ofType<LogInSuccess>(AuthActionTypes.GET_CURRENT_USER_SUCCESS),
    tap((data) => {
      this.router.navigate([AppRoutes.PWA + AppRoutes.QUOTE_LIST]);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  sessionExpired$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SESSION_EXPIRED),
    map((action: SessionExpired) => {
      const timeoutMessage = "Your session has expired, please login again.";
      return new SessionLogoutSuccess({ message: timeoutMessage });
    })
  );

  @Effect({ dispatch: false })
  sessionLogoutSuccess$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SESSION_LOGOUT_SUCCESS),
    tap((success) => {
      this.storage.logoutUserOut();
      this.router.navigate([AppRoutes.LOGIN]);
    })
  );

  @Effect()
  userAccessTypes$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.USER_ACCESS_TYPES),
    map((action: UserAccessTypes) => action.payload),
    switchMap((payload) => {
      return this.apiService.getAllRequest(EndPoints.USER_ACCESS_TYPES).pipe(
        map((result) => {
          return new UserAccessTypesSuccess({
            userAccessTypes: result.data.user_types,
          });
        }),
        catchError((error) => {
          return of(new UserAccessTypesFailure({ error: error.error.message }));
        })
      );
    })
  );
}
