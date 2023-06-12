import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getToken() {
    if (window.localStorage.hasOwnProperty('token')) {
      const token = window.localStorage.getItem('token');
      return token;
    }
    return false;
  }

  getUsername() {
    if (window.localStorage.hasOwnProperty('username')) {
      const user = window.localStorage.getItem('username');
      return user;
    }
    return '';
  }

  tokenExists(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  deleteToken() {
    window.localStorage.removeItem('token');
  }

  logoutUserOut() {
    window.localStorage.clear();
  }
}
