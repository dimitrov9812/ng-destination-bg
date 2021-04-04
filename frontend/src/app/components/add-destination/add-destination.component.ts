import { Component, OnInit } from '@angular/core';
import { DestinationMode } from 'src/app/models/detaination.mode';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.scss']
})
export class AddDestinationComponent implements OnInit {
  public mode: DestinationMode = DestinationMode.ADD;
  constructor() { }

  ngOnInit(): void {
  }

}
