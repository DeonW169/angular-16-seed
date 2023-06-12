import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/endpoints.enum';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let store: Store<BodyVaultStoreState>;
  

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take you to login page', () => {
    component.logout();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoutes.LOGIN]);
  });
});
