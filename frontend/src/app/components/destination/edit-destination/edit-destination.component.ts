import { Component, OnInit } from '@angular/core';
import { DestinationMode } from 'src/app/models/detaination.mode';

@Component({
  selector: 'app-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.scss']
})
export class EditDestinationComponent implements OnInit {
  public mode: DestinationMode = DestinationMode.EDIT;
  constructor() { }

  ngOnInit(): void {
  }

}
