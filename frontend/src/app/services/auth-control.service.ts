import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfo } from '../components/login/login.component';
import { RegisterInfo } from '../components/register/register.component';

@Injectable()
export class AuthControlService {
  private PORT = 5000;
  constructor(private http: HttpClient) {}

  login(user: LoginInfo): Observable<any> {
    return this.http.post(`http://localhost:${this.PORT}/api/user/login`,user);
  }

  register(user: RegisterInfo): Observable<any> {
    return this.http.post("http://localhost:5000/api/user/register",user);
  }

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

  getKey(): string | null {
    try {
      return localStorage.getItem("auth-token");
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
