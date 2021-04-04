import { Component, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationService } from 'src/app/services/destination.service';
import { UserActionsService } from 'src/app/services/user-actions.service';

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
  public completedDestinationsIds: string[] = [];

  constructor(private destinationService: DestinationService,
              private userActionsService: UserActionsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userActionsService.listCompleted().subscribe((res: string[]) => {
      this.completedDestinationsIds = res;
      if (this.completedDestinationsIds.length != 0) {
        this.completedDestinationsIds.map((id: string) => {
          this.destinationService.getDestinationDetails(id)
              .subscribe((result: IDestination) => {
                  this.filteredDestinations.push(result);
                  this.destinations.push(result);
              });
        });
      } else {
        this.isCompletedEmpty = true;
      }
      this.isLoading = false;
    });
  }

  handleFilteredDestinations(data: any): void {
    this.filteredDestinations = data.data;
    this.searchTerm = data.searchTerm;
  }
}
