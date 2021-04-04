import { Component, Input, OnInit } from '@angular/core';
import { DestinationMode } from 'src/app/models/detaination.mode';

@Component({
  selector: 'destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.scss']
})
export class DestinationDetailsComponent implements OnInit {
  @Input('mode') mode: DestinationMode;
  constructor() { }

  ngOnInit(): void {
  }

}
