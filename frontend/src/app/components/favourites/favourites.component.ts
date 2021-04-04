import { Component, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationService } from 'src/app/services/destination.service';
import { UserActionsService } from 'src/app/services/user-actions.service';

@Component({
  selector: 'favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  public destinations: IDestination[] = [];
  public filteredDestinations: IDestination[] = [];
  public searchTerm: string = '';
  public isLoading: boolean = false;
  public isFavouritesEmpty: boolean = false;
  public isInFavourites: boolean = false;
  public lovedDestinationIds: string[] = [];
  constructor(private destinationService: DestinationService,
              private userActionsService: UserActionsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userActionsService.listLoved()
        .subscribe((res: string[]) => {
            this.lovedDestinationIds = res;
            if (this.lovedDestinationIds.length != 0) {
              this.lovedDestinationIds.map((id: string) => {
                this.destinationService.getDestinationDetails(id)
                    .subscribe((result: IDestination) => {
                      this.filteredDestinations.push(result);
                      this.destinations.push(result);
                    });
              });
            } else {
              this.isFavouritesEmpty = true;
            }
            this.isLoading = false;
        });
  }

  handleFilteredDestinations(data: any): void {
    this.filteredDestinations = data.data;
    this.searchTerm = data.searchTerm;
  }
}
