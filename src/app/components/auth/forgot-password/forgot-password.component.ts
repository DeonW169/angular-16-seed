import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { RootStoreState } from "src/app/root-store";
import { ForgotPassword } from "src/app/root-store/bv-app-store/actions/auth.actions";
import { getForgotPasswordError, getForgotPasswordSuccess } from "src/app/root-store/bv-app-store/selectors/auth.selector";
import { AppRoutes } from "src/app/shared/endpoints.enum";
import { BvToastrService } from "src/app/services/toastr.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  forgotPasswordForm: FormGroup;

  showAlert: boolean = false;
  showSuccess: boolean = false;

  errorMessage: string = 'Unable to send password reset email, service is currently down, please try again.';
  successMessage: string = 'If there is an account that matches the email address provided, you will be sent a password reset link shortly';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<RootStoreState.RootState>,
    private router: Router,
    private toastrService: BvToastrService,
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.store
      .select(getForgotPasswordSuccess)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        if (res) {
          this.toastrService.showSuccessToaster("Success", this.successMessage, null);
          this.showSuccess = res;
        }
      });

    this.store
      .select(getForgotPasswordError)
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
      email: this.forgotPasswordForm.value.email,
    };

    this.store.dispatch(new ForgotPassword(payload));
  }

  onCancel() {
    this.router.navigate([AppRoutes.LOGIN]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
