import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('App', reducers),
    EffectsModule.forFeature([]),
  ],
})
export class AppStoreModule {}
