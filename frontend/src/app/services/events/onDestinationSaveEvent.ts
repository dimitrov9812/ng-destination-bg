import { Event } from "./Event";

export class OnDestinationSaveEvent extends Event {
  public static ID: string = "ON_DESTINATION_SAVE_EVENT";

  constructor() {
     super(OnDestinationSaveEvent.ID);
  }
}
