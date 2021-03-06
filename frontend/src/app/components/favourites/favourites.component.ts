import { Component, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationService } from 'src/app/services/destination.service';

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
  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.filteredDestinations = this.destinationService.getFavourites();
    this.destinations = this.destinationService.getFavourites();
    this.isLoading = false;
    if (this.filteredDestinations.length == 0) {
      this.isFavouritesEmpty = true;
    }
  }

  handleFilteredDestinations(data: any): void {
    this.filteredDestinations = data.data;
    this.searchTerm = data.searchTerm;
  }
}
