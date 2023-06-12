import { Component, OnDestroy, OnInit, HostListener } from "@angular/core";
import { HeaderService } from "../../../services/header.service";
// import { NavigationItemsService } from "../../../services/navigationItems.service";
import { LocalStorageService } from "../../../services/local-storage.service";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";
import { AppRoutes } from "src/app/shared/endpoints.enum";
import { Subscription, of, Subject, BehaviorSubject } from "rxjs";
import { takeUntil, filter } from 'rxjs/operators';
import { select, Store } from "@ngrx/store";
import {
  LogOut,
  GetCurrentUser,
} from "src/app/root-store/main-app-store/actions/auth.actions";
import { getAuthorisedNavItems } from "src/app/root-store/main-app-store/selectors/navigation.selector";
import { MainStoreState } from "src/app/root-store/main-app-store/state";
import { RootState } from "src/app/root-store/root-state";
import { CloseSidebar } from "../../../root-store/main-app-store/actions/sidebar-config-menu.actions";
import { NavItem } from "src/app/models/NavItem";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private cancelationSubscription = new Subscription();
  private ngUnsubscribe = new Subject();

  title = "";
  token: boolean;
  username = "";
  isDashboard = false;
  userType = "";
  isStaff: boolean = false;
  previousUrl = "";

  navItems: NavItem[];

  isKwikspaceApp = false;
  isLogin = false;
  showHeader: boolean = false;
  todaysDate;

  activeRoute = 'pwa/dashboard';
  
  isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(window.innerWidth <= 768);

  @HostListener('window:resize', ['$event'])
  setIsMobile(event) {
    const isMobile = event.target.innerWidth <= 768;
    this.isMobile.next(isMobile);
  }

  constructor(
    private headerService: HeaderService,
    // private navigationItemsService: NavigationItemsService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<MainStoreState>,
    private menuStore: Store<RootState>
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.isLogin = event.url.includes("/login") ? true : false;
      }

      if (event instanceof NavigationEnd) {
        this.previousUrl = event.url;
        this.isKwikspaceApp = this.setAppHeader(event, "Kwikspace");
        this.showHeader = event.url === '/login' ? false : true;
      }
    });
  }

  ngOnInit() {

    this.routerListener();

    this.fetchNavigationItems();
    this.headerService.setAuthorizedNavItems();

    this.todaysDate = new Date();
    // attempt to make the logout button dynamic
    this.cancelationSubscription.add(
      this.headerService.token.subscribe((updatedToken) => {
        this.token = updatedToken;
        this.username = this.localStorageService.getUsername();

        if (this.token) {
          this.store.dispatch(new GetCurrentUser());
        }
      })
    );

    this.cancelationSubscription.add(
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          this.isDashboard = event.url === `/${AppRoutes.DASHBOARD}`;
        }
        if (event instanceof NavigationEnd) {
          this.isDashboard =
            event.urlAfterRedirects.includes(AppRoutes.DASHBOARD) ||
            event.url.includes(AppRoutes.DASHBOARD);
        }
      })
    );

  }

  fetchNavigationItems() {
    this.headerService.currentNavItems$.subscribe(navItems => {
      this.navItems = navItems;
    })
  }

  setAppHeader(urlEvent: NavigationEnd, header): boolean {
    return urlEvent.url.includes(header) ? true : false;
  }

  routerListener() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.url;
      });
  }

  getActiveRoute() {
    return this.activeRoute;
  }

  setActiveTab(tab) {
    this.activeRoute = AppRoutes.PWA + tab;
    this.router.navigate([this.activeRoute]);
  }

  logout() {
    this.store.dispatch(new LogOut());
    this.localStorageService.logoutUserOut();
    this.router.navigate([AppRoutes.LOGIN]);
  }

  closeSideBar() {
    this.store.dispatch(new CloseSidebar());
  }

  dashboardRoleCheck(): boolean {
    // TODO: refactor this.
    // set user type in the state
    if (this.userType === "customer") {
      return true;
    } else if (this.isDashboard && this.userType !== "customer") {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.cancelationSubscription.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
