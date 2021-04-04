import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthControlService } from './auth-control.service';

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  public lovedDestinations: string[] = [];

  constructor(private http: HttpClient,
              private authService: AuthControlService) { }

  getToken(): HttpHeaders | undefined {
    let token: string | null = this.authService.getKey();
    let corsHeaders;
    if (token) {
      corsHeaders = new HttpHeaders({
        'auth-token': JSON.parse(token),
      });
    }

    return corsHeaders;
  }

  // list all loved destinations
  listLoved(): Observable<string[]> {
    let headers = this.getToken();

    return this.http.get<string[]>('http://localhost:5000/api/user-actions/list-all-loved',{ headers: headers });
  }

  // list all destination you want to complete
  listToComplete(): Observable<string[]> {
    let headers = this.getToken();

    return this.http.get<string[]>('http://localhost:5000/api/user-actions/list-all-to-complete',{ headers: headers });
  }

  // list all completed destinations
  listCompleted(): Observable<string[]> {
    let headers = this.getToken();

    return this.http.get<string[]>('http://localhost:5000/api/user-actions/list-all-completed',{ headers: headers });
  }

  // Add to loved
  addToLoved(id: string): Observable<string> {
    let headers = this.getToken();

    return this.http.post<string>(`http://localhost:5000/api/user-actions/add-to-loved/${id}`,null,{ headers: headers });
  }

  // Add to loved
  addToToComplete(id: string): Observable<string[]> {
    let headers = this.getToken();

    return this.http.post<string[]>(`http://localhost:5000/api/user-actions/add-to-to-complete/${id}`,null,{ headers: headers });
  }

  // Add to completed
  addToCompleted(id: string): Observable<string[]> {
    let headers = this.getToken();

    return this.http.post<string[]>(`http://localhost:5000/api/user-actions/add-to-completed/${id}`,null,{ headers: headers });
  }

  // check if destination is in the user's loved destinations or not
  checkLoved(id: string): Observable<string> {
    let headers = this.getToken();

    return this.http.get<string>(`http://localhost:5000/api/user-actions/check-loved/${id}`,{ headers: headers });
  }

  // check if destination is in the user's to complete destinations or not
  checkToComplete(id: string): Observable<string> {
    let headers = this.getToken();

    return this.http.get<string>(`http://localhost:5000/api/user-actions/check-to-complete/${id}`,{ headers: headers });
  }
}
