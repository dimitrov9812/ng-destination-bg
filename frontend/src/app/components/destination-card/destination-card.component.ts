import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDestination } from 'src/app/models/destinations';
import { UserActionsService } from 'src/app/services/user-actions.service';

@Component({
  selector: 'destination-card',
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.scss']
})
export class DestinationCardComponent implements OnInit {
  @Input('destination') destination: IDestination;
  public isInFavourites: boolean;
  public isInToComplete: boolean;
  public isInCompleted: boolean;
  constructor(private userActionsService: UserActionsService,
              private router: Router) { }

  ngOnInit(): void {
    // Check if the destination is loved or not
    this.checkDestinationLovedState();

    // Check if the destination is in to complete or not
    this.checkDestinationToCompleteState();

    // Check if the destination is added in completed
    this.checkDestinationCompletedState();
  }

  addToFavourites(): void {
    this.userActionsService.addToLoved(this.destination._id)
        .subscribe((res: any) => {
        },
        (err: any) => {
          switch (err.error.text) {
            case "added":
              this.isInFavourites = true;
              break;
            case "removed":
              this.isInFavourites = false;
              break;
          }
        });
  }

  addToChecked(): void {
    this.userActionsService.addToToComplete(this.destination._id)
        .subscribe((res: any) => {
        },
        (err: any) => {
          switch (err.error.text) {
            case "added":
              this.isInToComplete = true;
              break;
            case "removed":
              this.isInToComplete = false;
              break;
          }
        });
  }

  addToCompleted(): void {
    this.userActionsService.addToCompleted(this.destination._id)
        .subscribe((res: any) => {
        },
        (err: any) => {
          switch (err.error.text) {
            case "added":
              this.isInCompleted = true;
              break;
            case "removed":
              this.isInCompleted = false;
              break;
          }
        });
  }

  checkDestinationLovedState() {
    this.userActionsService.listLoved().subscribe((res) => {
      let index: number = res.findIndex((x: string) => x == this.destination._id);
      if (index != -1) {
        this.isInFavourites = true;
      } else {
        this.isInFavourites = false;
      }
    });
  }

  checkDestinationToCompleteState() {
    this.userActionsService.listToComplete().subscribe((res) => {
      let index: number = res.findIndex((x: string) => x == this.destination._id);
      if (index != -1) {
        this.isInToComplete = true;
      } else {
        this.isInToComplete = false;
      }
    });
  }

  checkDestinationCompletedState() {
    this.userActionsService.listCompleted().subscribe((res) => {
      let index: number = res.findIndex((x: string) => x == this.destination._id);
      if (index != -1) {
        this.isInCompleted = true;
      } else {
        this.isInCompleted = false;
      }
    });
  }

  navigateToDestinationDetails() {
    this.router.navigateByUrl('/main/destination/view');
  }
}
