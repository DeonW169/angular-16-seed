import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-icon-menu',
  templateUrl: './profile-icon-menu.component.html',
  styleUrls: ['./profile-icon-menu.component.scss']
})
export class ProfileIconMenuComponent implements OnInit {

  @Input() userName: string;

  constructor() { }

  ngOnInit() {
  }

}
