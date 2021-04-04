import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDestination } from 'src/app/models/destinations';
import { DestinationMode } from 'src/app/models/detaination.mode';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'view-destination',
  templateUrl: './view-destination.component.html',
  styleUrls: ['./view-destination.component.scss']
})
export class ViewDestinationComponent implements OnInit {
  public mode: DestinationMode = DestinationMode.VIEW;
  public destinationId: string = "";
  public destination: IDestination;

  constructor(private route: ActivatedRoute,
              private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.destinationId = this.route.snapshot.params.id;
    this.destinationService.getDestinationDetails(this.destinationId).subscribe((res) => {
      this.destination = res;
    });
  }

}
