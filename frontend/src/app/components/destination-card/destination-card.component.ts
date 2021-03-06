import { Component, Input, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { AuthControlService } from 'src/app/services/auth-control.service';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'destination-card',
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.scss']
})
export class DestinationCardComponent implements OnInit {
  @Input('destination') destination: IDestination;
  public isInFavourites: boolean;
  public isInChecked: boolean;
  public isInCompleted: boolean;
  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    if (this.destinationService.favourites.length >= 1) {
      this.isInFavourites = this.destinationService.checkFavourites(this.destination);
      this.isInChecked = this.destinationService.checkChecked(this.destination);
      this.isInCompleted = this.destinationService.checkCompleted(this.destination);
    } else {
      this.isInFavourites = false;
      this.isInChecked = false;
      this.isInCompleted = false;
    }
  }

  addToFavourites(): void {
    let isInFavourites = this.destinationService.addToFavourites(this.destination);
    if (isInFavourites) {
      this.isInFavourites = true;
    } else {
      this.isInFavourites = false;
    }
  }


  addToChecked(): void {
    let isInChecked = this.destinationService.addToChecked(this.destination);
    if (isInChecked) {
      this.isInChecked = true;
    } else {
      this.isInChecked = false;
    }
  }

  addToCompleted(): void {
    let isInCompleted = this.destinationService.addToCompleted(this.destination);
    if (isInCompleted) {
      this.isInCompleted = true;
    } else {
      this.isInCompleted = false;
    }
  }

}
