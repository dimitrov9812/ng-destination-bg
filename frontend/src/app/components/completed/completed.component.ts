import { Component, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {
  public destinations: IDestination[] = [];
  public filteredDestinations: IDestination[] = [];
  public searchTerm: string = '';
  public isLoading: boolean = false;
  public isCompletedEmpty: boolean = false;

  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.filteredDestinations = this.destinationService.getCompleted();
    this.destinations = this.destinationService.getCompleted();
    this.isLoading = false;
    if (this.filteredDestinations.length == 0) {
      this.isCompletedEmpty = true;
    }
  }

  handleFilteredDestinations(data: any): void {
    this.filteredDestinations = data.data;
    this.searchTerm = data.searchTerm;
  }
}
