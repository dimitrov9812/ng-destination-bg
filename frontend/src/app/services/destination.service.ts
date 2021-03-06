import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDestination } from '../models/destinations';
import { AuthControlService } from './auth-control.service';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private PORT: number = 4000;
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

  getDestinationDetails(id: number) {
    let token: string | null = this.authService.getKey();
    let corsHeaders;
    if (token) {
      corsHeaders = new HttpHeaders({
        'auth-token': JSON.parse(token),
      });
    }

    return this.http.get<IDestination>(`http://localhost:${this.PORT}/api/destinations/details/${id}`, {headers: corsHeaders});
  }

  filterDestinations(filter: string, destinations: IDestination[]) {
    let filteredDestinations: IDestination[] = destinations.filter((x) => x.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
    return filteredDestinations;
  }


  // FAVOURITES
  addToFavourites(destination: IDestination): boolean {
    let index: number = this.favourites.findIndex(x => x._id == destination._id);
    if (index == -1) {
      this.favourites.push(destination);
      return true;
    }
    this.removeFromFavourites(index);
    return false;
  }

  removeFromFavourites(index: number): void {
    this.favourites.splice(index,1);
  }

  getFavourites(): IDestination[] {
    return this.favourites;
  }

  checkFavourites(destination: IDestination): boolean {
    let index: number = this.favourites.findIndex(x => x._id == destination._id);
    if (index != -1) {
      return true;
    }
    return false;
  }

  // CHECKED
  addToChecked(destination: IDestination): boolean {
    let index: number = this.checked.findIndex(x => x._id == destination._id);
    if (index == -1) {
      this.checked.push(destination);
      return true;
    }
    this.removeFromChecked(index);
    return false;
  }

  removeFromChecked(index: number): void {
    this.checked.splice(index,1);
  }

  getChecked(): IDestination[] {
    return this.checked;
  }

  checkChecked(destination: IDestination): boolean {
    let index: number = this.checked.findIndex(x => x._id == destination._id);
    if (index != -1) {
      return true;
    }
    return false;
  }

  // COMPLETED
  addToCompleted(destination: IDestination): boolean {
    let index: number = this.completed.findIndex(x => x._id == destination._id);
    if (index == -1) {
      this.completed.push(destination);
      return true;
    }
    this.removeFromCompleted(index);
    return false;
  }

  removeFromCompleted(index: number): void {
    this.completed.splice(index,1);
  }

  getCompleted(): IDestination[] {
    return this.completed;
  }

  checkCompleted(destination: IDestination): boolean {
    let index: number = this.completed.findIndex(x => x._id == destination._id);
    if (index != -1) {
      return true;
    }
    return false;
  }
}
