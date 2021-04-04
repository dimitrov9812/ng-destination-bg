import { Component, OnInit } from '@angular/core';
import { DestinationMode } from 'src/app/models/detaination.mode';

@Component({
  selector: 'view-destination',
  templateUrl: './view-destination.component.html',
  styleUrls: ['./view-destination.component.scss']
})
export class ViewDestinationComponent implements OnInit {
  public mode: DestinationMode = DestinationMode.VIEW;
  constructor() { }

  ngOnInit(): void {
  }

}
