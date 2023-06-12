import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalComponent } from "./modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { ToggleSidebarOnclickOutside } from "src/app/root-store/main-app-store/actions/sidebar-config-menu.actions";

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let ngbModalSpy: jasmine.SpyObj<NgbModal>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async(() => {
    const ngbModal = jasmine.createSpyObj("NgbModal", ["open", "dismissAll"]);
    const store = jasmine.createSpyObj("Store", ["dispatch"]);

    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: NgbModal, useValue: ngbModal },
        { provide: Store, useValue: store },
      ],
    }).compileComponents();

    ngbModalSpy = TestBed.get(NgbModal);
    storeSpy = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("open should dispatch an action to disable sidebarnav onclick outside", () => {
    component.open();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      new ToggleSidebarOnclickOutside(false)
    );
  });

  it("open should the open the modal", () => {
    component.open();
    expect(ngbModalSpy.open.calls.count()).toBe(1);
  });

  it("onDismiss should dispatch an action to enable sidebarnav onclick outside", () => {
    component.onDismiss();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      new ToggleSidebarOnclickOutside(true)
    );
  });

  it("remove should dismiss the modal", () => {
    component.close();
    expect(ngbModalSpy.dismissAll.calls.count()).toBe(true);
  });

  it("remove should emit true when choosing to remove an item", () => {
    spyOn(component.removeItem, "emit");
    component.close();
    expect(component.removeItem.emit).toHaveBeenCalled();
  });
});
