import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UrlService } from './url-service.service';

@Injectable({
  providedIn: "root",
})
export class RoutingStateService {
  private history: any = [];

  constructor(private router: Router) { }

  public loadRouting(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.history = [...this.history, event];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || "/dashboard";
  }
}
