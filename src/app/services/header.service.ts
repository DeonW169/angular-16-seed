import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootStoreState } from 'src/app/store';
import { getCurrentUser } from '../store/auth-store/selectors/auth.selector';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { navItems, permissionAdmin, permissionCustomer, permissionStaff } from 'src/app/app.const';
import { NavItem } from '../models/NavItem';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  title = new BehaviorSubject('Login');
  token = new BehaviorSubject(LocalStorageService.prototype.tokenExists());

  private unsubscribe = new Subject();

  navItems: NavItem[] = [];

  currentNavItemsSubject$ = new BehaviorSubject(null);
  currentNavItems$ = this.currentNavItemsSubject$.asObservable();

  constructor(private store: Store<RootStoreState.RootState>) {
    this.setAuthorizedNavItems();
  }

  setNavItems(navItems: NavItem[] | any) {
    this.currentNavItemsSubject$.next(navItems);
  }

  fetchUserPermissions(): Promise<User> {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this.store
        .select(getCurrentUser)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res: User) => {
          if (!res) return;
          resolve(res);
        });
    }).catch((err) => {
      throw new Error(err);
    });
    return promise;
  }

  async setAuthorizedNavItems() {
    const user: User = await this.fetchUserPermissions();
    this.navItems = this.getAuthorizedNavItems(user.role);
    this.setNavItems(this.navItems);
  }

  getAuthorizedNavItems(role: string): any[] {
    let authorizedNavItems;

    authorizedNavItems = navItems.filter((navItem: NavItem) => {
      return this.checkPermissionsForUserType(navItem, role);
      // if (user.isSuperuser) {
      //   return this.checkPermissionsForUserType(navItem, permissionAdmin);
      // } else if (user.isStaff && user.salesRep !== null) {
      //   return this.checkPermissionsForUserType(navItem, permissionStaff);
      // } else {
      //   return this.checkPermissionsForUserType(navItem, permissionCustomer);
      // }
    });

    authorizedNavItems = authorizedNavItems.filter(Boolean);
    authorizedNavItems = Array.from(new Set(authorizedNavItems));

    return authorizedNavItems;
  }

  checkPermissionsForUserType(navItem: NavItem, permissionString: string) {
    let foundPermittedItem = navItem.permissions.filter((permission) => {
      return permissionString == permission;
    });
    let isAllowed = foundPermittedItem.length > 0 ? true : false;
    return isAllowed;
  }

  setToken(token: boolean) {
    this.token.next(token);
  }
}
