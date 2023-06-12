import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { catchError } from 'rxjs/operators';
import {
  LogOut,
  SessionExpired,
} from '../store/auth-store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../store';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements HttpInterceptor {
  constructor(
    private storage: LocalStorageService,
    private store: Store<RootStoreState.RootState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.storage.tokenExists()) {
      req = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Token ${this.storage.getToken()}`
        ),
      });
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (
          (err.status === 401 || err.status === 403) &&
          this.storage.getToken()
        ) {
          this.store.dispatch(new LogOut());
          setTimeout(() => {
            this.store.dispatch(new SessionExpired());
          }, 200);
        }
        return this.globalErrorCatching(err);
      })
    );
  }

  globalErrorCatching(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (
        (error as HttpErrorResponse).status === 0 ||
        (error as HttpErrorResponse).status === 502 ||
        (error as HttpErrorResponse).status === 503
      ) {
        error.error.message =
          'This service is not available at this moment, please try again later.';
        return throwError(error);
      }
      return throwError(error);
    } else if (error instanceof TypeError) {
      return throwError(error);
    } else if (error instanceof Error) {
      return throwError(error);
    } else {
      error.error.message = 'Something went wrong, please try again later.';
      return throwError(error);
    }
  }
}
