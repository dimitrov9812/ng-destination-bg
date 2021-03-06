import { Injectable } from '@angular/core';

@Injectable()
export class AuthControlService {
  constructor() {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // set the auth-key directly
  setKey(data: string): void {
    try {
      localStorage.setItem("auth-token", JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // get(key: string): any {
  //     return JSON.parse(lo
  //   try {calStorage.getItem(key));
  //   } catch (e) {
  //     console.error('Error getting data from localStorage', e);
  //     return null;
  //   }
  // }

  getKey() {
    try {
      return localStorage.getItem("auth-token");
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
