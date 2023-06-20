import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/** Modules */
import { AuthModule } from './components/auth/auth.module';
import { KwikspaceModule } from './components/pwa/pwa.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared-modules/shared-modules.module';
import { RootStoreModule } from './store';

/** Components */
import { AppComponent } from './app.component';
import { ProfileIconMenuComponent } from './core/components/profile-icon-menu/profile-icon-menu.component';

/** Services */
import { TokenService } from './services/token.service';
import { AppToastrService } from './services/toastr.service';
import { RoutingStateService } from './services/routing-state.service';

/** Environment */
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, ProfileIconMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RootStoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    AppToastrService,
    RoutingStateService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },
    { provide: Window, useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
