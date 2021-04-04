import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDestination } from '../models/destinations';
import { AuthControlService } from './auth-control.service';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private PORT: number = 5000;
  private URL: string = `http://localhost:${this.PORT}/api/destinations/all`;
  private URL_DETAILS: string = `http://localhost:${this.PORT}/api/destinations/details/`;
  public favourites: IDestination[] = [];
  public checked: IDestination[] = [];
  public completed: IDestination[] = [];

  constructor(private http: HttpClient,
              private authService: AuthControlService) {}

  getAllDestinations(): Observable<IDestination[]> {
    let token: string | null = this.authService.getKey();
    let corsHeaders;
    if (token) {
      corsHeaders = new HttpHeaders({
        'auth-token': JSON.parse(token),
      });
    }

      return this.http.get<IDestination[]>(this.URL,{headers: corsHeaders});
  }

  getDestinationDetails(id: string): Observable<IDestination> {
    let token: string | null = this.authService.getKey();
    let corsHeaders;
    if (token) {
      corsHeaders = new HttpHeaders({
        'auth-token': JSON.parse(token),
      });
    }

    return this.http.get<IDestination>(`${this.URL_DETAILS}${id}`, {headers: corsHeaders});
  }

  filterDestinations(filter: string, destinations: IDestination[]): IDestination[] {
    let filteredDestinations: IDestination[] = destinations.filter((x) => x.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
    return filteredDestinations;
  }
}
