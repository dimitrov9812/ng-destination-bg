import { Component, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationService } from 'src/app/services/destination.service';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public destinations: any[] = [];
  public filteredDestinations: IDestination[] = [];
  public searchTerm: string = '';
  public isLoading: boolean = false;
  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.destinationService
        .getAllDestinations()
        .pipe(
          shareReplay(1)
        ).subscribe(
          (data: IDestination[]) => {
            this.filteredDestinations = data;
            this.destinations = data;
            this.isLoading = false;
        },
        (err: any) => console.log(err)
        );
  }

  handleFilteredDestinations(data: any): void {
    this.filteredDestinations = data.data;
    this.searchTerm = data.searchTerm;
  }
}
