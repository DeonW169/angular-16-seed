import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootStoreState } from 'src/app/store';
import { getCurrentUser } from '../store/auth-store/selectors/auth.selector';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { navItems } from 'src/app/app.const';
import { NavItem } from '../models/NavItem';

const CUSTOMER_STRING = 'customer';
const STAFF_STRING = 'staff';
const ADMIN_STRING = 'admin';

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

  setNavItems(navItems: NavItem[]) {
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
    const user = await this.fetchUserPermissions();
    this.navItems = this.getAuthorisedNavItems(user);
    this.setNavItems(this.navItems);
  }

  getAuthorisedNavItems(user: User): any[] {
    let authorisedNavItems;

    authorisedNavItems = navItems.filter((navItem: NavItem, index) => {
      if (user.isSuperuser) {
        return this.checkPermissionsForUserType(navItem, ADMIN_STRING);
      } else if (user.isStaff && user.salesRep !== null) {
        return this.checkPermissionsForUserType(navItem, STAFF_STRING);
      } else {
        return this.checkPermissionsForUserType(navItem, CUSTOMER_STRING);
      }
    });

    authorisedNavItems = authorisedNavItems.filter(Boolean);
    authorisedNavItems = Array.from(new Set(authorisedNavItems));

    return authorisedNavItems;
  }

  checkPermissionsForUserType(navItem, permissionString) {
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
