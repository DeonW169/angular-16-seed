import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from '../shared/endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuardService implements CanActivate {
  constructor(private router: Router, private storage: LocalStorageService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.logInActivated();
  }

  logInActivated(): boolean {
    if (this.storage.getToken()) {
      this.router.navigate([`${AppRoutes.DASHBOARD}`]);
      return false;
    }
    return true;
  }
}
