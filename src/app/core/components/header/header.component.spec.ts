import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMockStore} from '@ngrx/store/testing';
import {Store} from '@ngrx/store';
import {RootStoreState} from 'src/app/root-store';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {PortalMenuComponent} from '../portal-menu/portal-menu.component';
import {NavigationEnd} from '@angular/router';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<RootStoreState.RootState>;

  
});
