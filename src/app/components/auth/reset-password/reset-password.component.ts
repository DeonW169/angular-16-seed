import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { RootStoreState } from "src/app/root-store";
import { ResetPassword } from "src/app/root-store/bv-app-store/actions/auth.actions";
import { getResetPasswordError, getResetPasswordSuccess } from "src/app/root-store/bv-app-store/selectors/auth.selector";
import { BvToastrService } from "src/app/services/toastr.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  resetPasswordForm: FormGroup;

  showAlert: boolean = false;
  showSuccess: boolean = false;

  errorMessage: string = 'Unable to reset your password due to a server error. Sorry for the inconvenience, please try again later';
  successMessage: string = 'Password has been reset';

  matchPasswordError: boolean = false;
  userEmail;
  userSecret;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<RootStoreState.RootState>,
    private route: ActivatedRoute,
    private toastrService: BvToastrService,
  ) { }

  ngOnInit() {
    const { params } = this.route.snapshot;

    this.userEmail = params.email;
    this.userSecret = params.id;

    this.resetPasswordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    });
  }

  onSubmit() {
    this.store
      .select(getResetPasswordSuccess)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        if (res) {
          this.toastrService.showSuccessToaster("Success", this.successMessage, null);
          this.showSuccess = res;
        }
      });

    this.store
      .select(getResetPasswordError)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        if (res) {
          this.toastrService.showErrorToaster(
            "Failed",
            this.errorMessage,
            null
          );
          this.showAlert = res;
        }
      });

    const payload = {
      email: this.userEmail,
      jwt: this.userSecret,
      password: this.resetPasswordForm.value.password,
      confirmPassword: this.resetPasswordForm.value.confirmPassword,
    };

    this.store.dispatch(new ResetPassword(payload));
  }

  validatePasswordMatch() {
    this.matchPasswordError = this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirmPassword ? false : true;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
