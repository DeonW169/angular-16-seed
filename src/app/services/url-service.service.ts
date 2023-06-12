import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  previousUrl: string | undefined;
  currentUrl: string;
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  getPreviousUrl(): string {
    return this.previousUrl || '';
  }
}
