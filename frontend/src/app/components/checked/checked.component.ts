import { Component, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationService } from 'src/app/services/destination.service';
import { UserActionsService } from 'src/app/services/user-actions.service';

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
  public checkedDestinationsIds: string[] = [];

  constructor(private destinationService: DestinationService,
              private userActionsService: UserActionsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.isLoading = true;
    this.userActionsService.listToComplete()
        .subscribe((res: string[]) => {
          this.checkedDestinationsIds = res;
          if (this.checkedDestinationsIds.length != 0) {
            this.checkedDestinationsIds.map((id) => {
              this.destinationService.getDestinationDetails(id)
                  .subscribe((result: IDestination) => {
                    this.filteredDestinations.push(result);
                    this.destinations.push(result);
                  });
            });
          } else {
            this.isCheckedEmpty = true;
          }
          this.isLoading = false;
        });
  }

  handleFilteredDestinations(data: any): void {
    this.filteredDestinations = data.data;
    this.searchTerm = data.searchTerm;
  }
}
