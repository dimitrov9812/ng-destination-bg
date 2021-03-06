import { Component, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.scss']
})
export class CheckedComponent implements OnInit {
  public destinations: IDestination[] = [];
  public filteredDestinations: IDestination[] = [];
  public searchTerm: string = '';
  public isLoading: boolean = false;
  public isCheckedEmpty: boolean = false;

  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.filteredDestinations = this.destinationService.getChecked();
    this.destinations = this.destinationService.getChecked();
    this.isLoading = false;
    if (this.filteredDestinations.length == 0) {
      this.isCheckedEmpty = true;
    }
  }

  handleFilteredDestinations(data: any): void {
    this.filteredDestinations = data.data;
    this.searchTerm = data.searchTerm;
  }
}
