import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[dragDrop]'
})
export class DragDropDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f5fcff';
  @HostBinding('style.opacity') private opacity = '1';

  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }
}
