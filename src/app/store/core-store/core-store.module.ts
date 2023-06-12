import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state';
import { localStorageSync } from 'ngrx-store-localstorage';
import { mainAppFeatureKey } from '../store-constants';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['nav'],
    rehydrate: true,
  })(reducer);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(mainAppFeatureKey, reducers, {
      metaReducers: [localStorageSyncReducer],
    }),
  ],
})
export class CoreStoreModule {}
