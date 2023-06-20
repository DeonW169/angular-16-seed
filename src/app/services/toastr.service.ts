import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppToastrService {
  constructor(private toaster: ToastrService) { }

  showSuccessToaster(
    title: string | '',
    message: string | '',
    props: { closeButton: boolean; timeOut: any; tapToDismiss: boolean }
  ) {
    let closeButton = props ? props.closeButton : true;
    let timeOut = props ? props.timeOut : 2000;
    let tapToDismiss = props ? props.tapToDismiss : true;

    setTimeout(() =>
      this.toaster.success(message, title, {
        closeButton,
        timeOut,
        tapToDismiss,
      })
    );
  }

  showErrorToaster(
    title: string | '',
    message: string | '',
    props: { closeButton: boolean; timeOut: any; tapToDismiss: boolean }
  ) {
    let closeButton = props ? props.closeButton : true;
    let timeOut = props ? props.timeOut : 2000;
    let tapToDismiss = props ? props.tapToDismiss : true;

    setTimeout(() =>
      this.toaster.error(message, title, {
        closeButton,
        timeOut,
        tapToDismiss,
      })
    );
  }
}
