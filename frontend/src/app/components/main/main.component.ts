import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthControlService } from 'src/app/services/auth-control.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private port: number = 4000;
  public token: string | null = '';
  private error: string = '';
  public destinations: Destination[] = [];
  public isDestinationSelected: boolean = false;
  public selectedDestination?: Destination;

  constructor(private http: HttpClient,
              private localStorage: AuthControlService) {
  }


  ngOnInit(): void {
    // get the token and assign the local token variable
    let token: string | null = this.localStorage.getKey();
    if (token) {
      this.token = JSON.parse(token);
    }

    this.getDestinations();
  }

  getDestinations(): void {
    // create the headers
    let corsHeaders;
    if (this.token) {
      corsHeaders = new HttpHeaders({
        'auth-token': this.token,
      });
    }

    // make the call
    this.http.get<any>(`http://localhost:${this.port}/api/destinations/all`,{ headers: corsHeaders }).subscribe((data) => {
        this.destinations = [];
        this.destinations = data;
    });
  }

  getDestinationByID(id?: string): void {
    let corsHeaders;
    if (this.token) {
      corsHeaders = new HttpHeaders({
        'auth-token': this.token,
      });
    }

    this.http.get<any>(`http://localhost:${this.port}/api/destinations/details/${id}`,{headers: corsHeaders}).subscribe((data: Destination) => {
      if (data) {
        this.isDestinationSelected = true;
        this.selectedDestination = new Destination(data.name,
                                                   data.location,
                                                   data.information,
                                                   data.clothing,
                                                   data.coordinates,
                                                   data.hardness,
                                                   data.averageTime,
                                                   data.bestSeason,
                                                   data.pictures,
                                                   data._id);
      }
    });
  }

  createDestination() {
    const destination = new Destination('Дяволският мост19',
                                        'Девин',
                                        'Дяволският мост информация',
                                        'неутрално',
                                        'Девин,България',
                                        'лесно',
                                        '30 минути',
                                        'лято',
                                        'асдасддасвадасдс');

    this.http.post(`http://localhost:${this.port}/api/destinations/create`,destination,{})
             .subscribe((data: any) => {
                  if (data) {
                    if (data._id) {
                      console.log("SUCESS");
                      console.log(data);
                    } else {
                      let error: string = data.details[0].message;
                      this.error = error;
                    }
                  }
                },
                (err) => {
                    if (err) {
                      let error: string = err.error.text;
                      this.error = error;
                }
              });
  }
}

class Destination {
  constructor(public name: string,
              public location: string,
              public information: string,
              public clothing: string,
              public coordinates: string,
              public hardness: string,
              public averageTime: string,
              public bestSeason: string,
              public pictures: string,
              public _id?: string){}
}
