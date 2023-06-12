import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MainStoreState } from "src/app/root-store/main-app-store/state";
import { Store } from "@ngrx/store";
import { ToggleSidebarOnclickOutside } from "src/app/root-store/main-app-store/actions/sidebar-config-menu.actions";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @ViewChild("content", { static: false }) content: ElementRef;

  @Input() title: string;
  @Input() size = "xl";
  @Input() showActionButton = true;
  @Input() showInformationBlock = true;
  @Input() showFooterActions = true;
  @Input() hasSecondarySave = false;
  @Output() removeItem = new EventEmitter<any>();
  @Output() openModal = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onSecondarySave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<any>();
  @Input() actionButtonLabel = "Save";
  @Input() actionButtonSecondaryLabel = "Save";
  @Input() backDrop = true;
  @Input() isDisabled = false;
  @Input() actionButtonBusy = false;
  @Input() actionButtonSecondaryBusy = false;
  modal: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private store: Store<MainStoreState>
  ) {}

  ngOnInit() {}

  open() {
    this.modal = this.modalService.open(this.content, {
      ariaLabelledBy: "modal-basic-title",
      beforeDismiss: () => this.onDismiss(),
      size: this.size,
      scrollable: true,
    });
    this.openModal.emit();
  }

  onDismiss() {
    this.closeModal.emit();
    return true;
  }

  save() {
    this.onSave.emit();
  }

  saveSecondary() {
    this.onSecondarySave.emit();
  }

  close() {
    this.closeModal.emit();
    if (this.modal !== undefined) {
      this.modal.close();
    }
  }
}
