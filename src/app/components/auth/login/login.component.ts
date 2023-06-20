import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { LogIn } from 'src/app/store/auth-store/actions/auth.actions';
import { HeaderService } from 'src/app/services/header.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ClearAuthorizedPortals } from 'src/app/root-store/bv-app-store/actions/portal.actions';
import { RootStoreState } from 'src/app/store';

import { AppRoutes } from 'src/app/shared/endpoints.enum';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  heading = 'Login';
  alertType: string = '';
  alertMessage: string = '';
  showAlert = false;
  loading: boolean = false;
  private subscriptions = new Subscription();

  constructor(
    private store: Store<RootStoreState.RootState>,
    private formBuilder: FormBuilder,
    private headerTitleService: HeaderService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.store.dispatch(new ClearAuthorisedPortals());

    this.headerTitleService.setToken(this.localStorageService.tokenExists());

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.subscriptions.add(
      this.store.pipe(select((state: any) => state.bvApp.auth)).subscribe((data) => {
        if (data) {
          this.alertType = data.alertType;
          this.alertMessage = 'Email and Password did not match';
          this.showAlert = data.logInError;
          this.loading = data.logInLoading;
        }
      })
    );
  }

  login() {
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    localStorage.setItem('username', payload.email);
    this.store.dispatch(new LogIn(payload));
  }

  register() {
    this.router.navigate([AppRoutes.REGISTER]);
  }

  forgotPassword() {
    this.router.navigate([AppRoutes.FORGOT_PASSWORD]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
