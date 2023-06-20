import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';

import { RootStoreState } from 'src/app/root-store';
import { StaticDataService } from "src/app/services/static-data.service";
import { AppRoutes } from 'src/app/shared/endpoints.enum';
import { Register } from 'src/app/root-store/bv-app-store/actions/auth.actions';
import { ClearAuthorisedPortals } from 'src/app/root-store/bv-app-store/actions/portal.actions';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit, OnDestroy {
  private cancelationSubscription = new Subscription();

  registrationForm: FormGroup;
  roles = [];
  planTypes = [];
  planType;

  alertType;
  alertMessage;
  showAlert = false;
  loading: boolean = false;
  hasTrainer = false;
  matchPasswordError: boolean = false;

  constructor(
    private store: Store<RootStoreState.RootState>,
    private formBuilder: FormBuilder,
    private router: Router,
    private staticDataService: StaticDataService
  ) { }

  ngOnInit() {
    this.store.dispatch(new ClearAuthorisedPortals());

    this.roles = this.staticDataService.getRoleOptions();
    this.planTypes = this.staticDataService.getPlanTypes();

    this.registrationForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      contactNumber: [null, [Validators.required]],
      planType: [null, [Validators.required]],
      agreeTerms: [null, [Validators.required]],
      agreePrivacy: [null, [Validators.required]]
    });

    this.cancelationSubscription.add(
      this.store.pipe(select((state: any) => state.bvApp.auth)).subscribe((data) => {
        if (data) {
          this.alertType = data.alertType;
          this.alertMessage = 'Could not process your request at this time';
          this.showAlert = data.registerError;
          this.loading = data.registerLoading;

          if (data.registerError) {
            this.alertMessage = 'Failed to create new account';
          }
        }
      })
    );
  }

  setRoleType(event) {
    this.hasTrainer = event.value === "hasTrainer" ? true : false;
  }

  onSubmit() {
    let userName =
      this.registrationForm.value.name +
      " " +
      this.registrationForm.value.surname;

    let policiesAccepted = this.registrationForm.value.agreeTerms && this.registrationForm.value.agreePrivacy ? true : false;

    const payload = {
      email: this.registrationForm.value.email,
      name: userName,
      password: this.registrationForm.value.password,
      confirmPassword: this.registrationForm.value.confirmPassword,
      role: 'trainer',
      contactNumber: this.registrationForm.value.contactNumber,
      activeState: true,
      trial: true,
      planType: this.registrationForm.value.planType,
      policiesAccepted
    };

    this.store.dispatch(new Register(payload));
  }

  validatePasswordMatch() {
    this.matchPasswordError = this.registrationForm.value.password === this.registrationForm.value.confirmPassword ? false : true;
  }

  onCancel() {
    this.router.navigate([AppRoutes.LOGIN]);
  }

  ngOnDestroy() {
    this.cancelationSubscription.unsubscribe();
  }
}
