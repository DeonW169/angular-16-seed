import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss'],
})
export class DownloadModalComponent implements OnInit {
  @Input() data: any;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
