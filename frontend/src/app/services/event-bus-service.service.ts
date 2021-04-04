import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Event } from './events/Event';

@Injectable({
  providedIn: 'root'
})
export class EventBusServiceService {
  private onEvent: Subject<any>;

  constructor() {
    this.onEvent = new Subject();
  }

  emit(event: Event) {
    this.onEvent.next(event);
  }

  public on(event: Event) : Observable<Event> {
    return this.onEvent.pipe(filter((e:Event) => e.id === event.id))
	}
}
