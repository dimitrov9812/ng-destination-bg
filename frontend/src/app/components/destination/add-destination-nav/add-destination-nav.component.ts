import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventBusServiceService } from 'src/app/services/event-bus-service.service';
import { OnDestinationSaveEvent } from 'src/app/services/events/onDestinationSaveEvent';

@Component({
  selector: 'add-destination-nav',
  templateUrl: './add-destination-nav.component.html',
  styleUrls: ['./add-destination-nav.component.scss']
})
export class AddDestinationNavComponent implements OnInit {

  constructor(private router: Router,
              private eventBusService: EventBusServiceService) { }

  ngOnInit(): void {
  }

  navigateHome(): void {
    this.router.navigateByUrl('/main');
  }

  saveDestination(): void {
    console.log("SAVING NAVIGATION IN NAV");
    this.eventBusService.emit(new OnDestinationSaveEvent());
  }
}
