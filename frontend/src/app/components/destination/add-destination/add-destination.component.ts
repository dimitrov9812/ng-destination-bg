import { Component, OnInit } from '@angular/core';
import { IDestination } from 'src/app/models/destinations';
import { DestinationMode } from 'src/app/models/detaination.mode';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.scss']
})
export class AddDestinationComponent implements OnInit {
  public mode: DestinationMode = DestinationMode.ADD;
  public destination: IDestination;
  constructor() { }

  ngOnInit(): void {
  }

}
