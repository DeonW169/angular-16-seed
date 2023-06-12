import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIconMenuComponent } from './profile-icon-menu.component';

describe('ProfileIconMenuComponent', () => {
  let component: ProfileIconMenuComponent;
  let fixture: ComponentFixture<ProfileIconMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileIconMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIconMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
