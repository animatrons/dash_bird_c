import { Injectable } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { Alert, AlertTypes } from '../models/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private count = 0;
  private alertSubject = new Subject<Alert>();

  constructor() { }

  onAlert() {
    return this.alertSubject.asObservable();
  }

  private alert(alert: Alert) {
    alert.id = 'alert_' + this.count++;
    this.alertSubject.next(alert);
  }

  success(message: string, options?: Partial<Alert>) {
    this.alert(new Alert({...options, type: AlertTypes.Success, message}));
  }

  danger(message: string, options?: Partial<Alert>) {
    this.alert(new Alert({...options, type: AlertTypes.Danger, message}));
  }

  warn(message: string, options?: Partial<Alert>) {
    this.alert(new Alert({...options, type: AlertTypes.Warn, message}));
  }

  info(message: string, options?: Partial<Alert>) {
    this.alert(new Alert({...options, type: AlertTypes.Info, message}));
  }

  clear() {
    this.alert(new Alert())
  }

}
