import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { LogIn } from 'src/app/store/auth-store/actions/auth.actions';
import { HeaderService } from 'src/app/services/header.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ClearAuthorisedNavs } from 'src/app/store/core-store/actions/navigation.actions';
import { RootStoreState } from 'src/app/store';

import { AppRoutes } from 'src/app/shared/endpoints.enum';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  loginForm!: FormGroup;
  heading = 'Login';
  alertType: any;
  alertMessage: string = '';
  showAlert = false;
  loading: boolean = false;

  fieldTextType: boolean = false;

  isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    window.innerWidth <= 640
  );

  @HostListener('window:resize', ['$event'])
  setIsMobile(event: { target: { innerWidth: number } }) {
    const isMobile = event.target.innerWidth <= 640;
    this.isMobile.next(isMobile);
  }

  constructor(
    private store: Store<RootStoreState.RootState>,
    private formBuilder: FormBuilder,
    private headerTitleService: HeaderService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.store.dispatch(new ClearAuthorisedNavs());

    this.headerTitleService.setToken(this.localStorageService.tokenExists());

    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.subscriptions.add(
      this.store
        .pipe(select((state: any) => state.mainApp.auth))
        .subscribe((data) => {
          if (data) {
            this.alertType = data.alertType;
            this.alertMessage = 'Username and Password did not match';
            this.showAlert = data.logInError;
            this.loading = data.logInLoading;
          }
        })
    );
  }

  login() {
    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    localStorage.setItem('username', payload.username);
    this.store.dispatch(new LogIn(payload));
  }

  register() {
    let url = `${environment.baseUrl}/${AppRoutes.REGISTER}`;
    window.location.href = url;
  }

  forgotPassword() {
    let url = `${environment.baseUrl}/${AppRoutes.FORGOT_PASSWORD}`;
    window.location.href = url;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
