import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppStoreModule } from './app-store/app-store.module';
import { AuthStoreModule } from './auth-store/auth-store.module';
import { CoreStoreModule } from './core-store/core-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    EffectsModule.forRoot([]),
    AppStoreModule,
    AuthStoreModule,
    CoreStoreModule,
  ],
})
export class RootStoreModule {}
