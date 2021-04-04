import { Component, Input, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationMode } from 'src/app/models/detaination.mode';
import { EventBusServiceService } from 'src/app/services/event-bus-service.service';
import { OnDestinationSaveEvent } from 'src/app/services/events/onDestinationSaveEvent';

@Component({
  selector: 'destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.scss']
})
export class DestinationDetailsComponent implements OnInit {
  @Input('mode') mode: DestinationMode;
  @Input('destination') destination: IDestination;

  constructor(private eventBusService: EventBusServiceService) { }

  ngOnInit(): void {
    this.eventBusService.on(new OnDestinationSaveEvent).subscribe((x) => {
      console.log("Trying to save destination....")
    });
  }
}
