import { Component } from '@angular/core';
import { Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { CancelPendingRequestService } from './services/cancel-pending-requets.service';
import { environment } from './../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-seed';
  showHeader: boolean | undefined;

  constructor(
    private router: Router,
    private cancelRequestsService: CancelPendingRequestService,
    private pageTitles: Title
  ) {
    this.router.events.subscribe((event) => {
      // cancel pending requests when leaving the page
      if (event instanceof ActivationEnd) {
        this.cancelRequestsService.cancelPendingRequests();
        this.pageTitles.setTitle(
          event.snapshot.data['title']
            ? event.snapshot.data['title']
            : this.title
        );
        this.showHeader = event.snapshot.url.length > 0 ? true : false;
      }
      // capture router events and forward them to Google Analytics.
      if (environment.production) {
        if (event instanceof NavigationEnd) {
        }
      }
    });
  }
}
