import { Injectable } from "@angular/core";

@Injectable()
export class TimeService {

  getDiff(timeStamp1: number, timeStamp2: number) {
    return timeStamp2 - timeStamp1;
  }

  timeSince(timeStamp: number) {
    return Date.now() - timeStamp;
  }
}
