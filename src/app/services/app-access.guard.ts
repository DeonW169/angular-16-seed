import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from '../store/state';
import { getAuthorisedNavItems } from '../store/core-store/selectors/navigation.selector';
import { AppRoutes } from '../shared/endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class AppAccessGuard implements CanActivate {
  constructor(private router: Router, public store: Store<RootState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canAccessApp(next);
  }

  canAccessApp(route: ActivatedRouteSnapshot): boolean {
    const path = route.url[0].path;
    let canAccess = false;
    this.store.pipe(select(getAuthorisedNavItems)).subscribe((data) => {
      if (data.length > 0) {
        canAccess =
          data.filter((urls: { route: string }) =>
            urls.route.toLowerCase().includes(path.toLowerCase())
          ).length > 0;
      }
    });
    if (!canAccess) {
      this.router.navigate([`${AppRoutes.LOGIN}`]);
    }
    return canAccess;
  }
}
