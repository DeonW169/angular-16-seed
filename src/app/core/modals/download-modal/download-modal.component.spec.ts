import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadModalComponent } from './download-modal.component';

describe('AlarmModalComponent', () => {
  let component: DownloadModalComponent;
  let fixture: ComponentFixture<DownloadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
