import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {
  @Input() message: string | undefined;
  @Input() errorType: any; // info, warning, error, success
  @Input() showArrow = false;

  alertTypes = [
    { errorType: 'error', icon: 'fa-close' },
    { errorType: 'success', icon: 'fa-check' },
    { errorType: 'info', icon: 'fa-info' },
    { errorType: 'note', icon: '' },
    { errorType: 'warning', icon: 'fa-exclamation' },
  ];

  constructor() {}

  ngOnInit() {}
}
