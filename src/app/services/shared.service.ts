import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DownloadModalComponent } from '../core/modals/download-modal/download-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private modalService: NgbModal) { }

  saveAs(uri: string, filename: string) {
    const link = document.createElement('a');
    filename = filename.replace(/\./g, '_');
    if (typeof link.download === 'string') {
      this.modalService.open(DownloadModalComponent, {
        ariaLabelledBy: 'modal-basic-title',
      });

      link.href = uri;
      link.download = filename;
      document.body.appendChild(link); // Firefox requires the link to be in the body

      link.click(); // simulate click

      document.body.removeChild(link); // remove the link when done
    } else {
      window.open(uri);
    }
  }
}
