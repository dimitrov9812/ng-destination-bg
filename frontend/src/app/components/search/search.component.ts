import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IDestination } from 'src/app/models/destinations';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('destinations') destinations: IDestination[];
  @Output('filter') filter: EventEmitter<any> = new EventEmitter<any>();
  public searchField = new FormControl();
  public isDropdownActive: boolean = false;
  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.searchField.valueChanges
        .pipe(
          debounceTime(500)
        )
        .subscribe(
          (value: string) => {
            this.handleSearch(value)
          },
          (err: any) => console.log(err),
          () => console.log("completed")
        )
  }

  handleSearch(searchTerm: string) {
    let filteredDestinations = this.destinationService.filterDestinations(searchTerm, this.destinations);
    this.filter.emit({data: filteredDestinations, searchTerm: searchTerm});
  }
}
