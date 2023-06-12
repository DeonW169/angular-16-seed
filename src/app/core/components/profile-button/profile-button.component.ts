import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../../../services/local-storage.service";
import { Store } from "@ngrx/store";
import { LogOut } from "src/app/root-store/main-app-store/actions/auth.actions";
import { MainStoreState } from "src/app/root-store/main-app-store/state";
import { AppRoutes } from "src/app/shared/endpoints.enum";
import { HeaderService } from "src/app/services/header.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile-button",
  templateUrl: "./profile-button.component.html",
  styleUrls: ["./profile-button.component.scss"]
})

export class ProfileButtonComponent implements OnInit, OnDestroy {
  public firstLetter = "";
  public userName = "";
  private cancelationSubscription = new Subscription();

  constructor(
    private localStorageService: LocalStorageService,
    private headerService: HeaderService,
    private store: Store<MainStoreState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.cancelationSubscription.add(
      this.headerService.token.subscribe(updatedToken => {
        this.userName = this.localStorageService.getUsername();
        this.firstLetter = this.userName
          ? this.userName.charAt(0).toUpperCase()
          : "?";
      })
    );
  }

  logout() {
    this.localStorageService.logoutUserOut();
    this.store.dispatch(new LogOut());
    this.router.navigate([AppRoutes.LOGIN]);
  }

  ngOnDestroy() {
    this.cancelationSubscription.unsubscribe();
  }
}
