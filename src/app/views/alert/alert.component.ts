import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertTypes } from 'src/app/core/models/Alert';
import { AlertService } from 'src/app/core/utils/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
  host: {'class': 'toast-container position-fixed bottom-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class AlertComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;
  alertTypes = AlertTypes;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert()
      .subscribe(alert => {
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }
        const header = this.getAlertStyle(alert)[1];
        alert.title = alert.title ? header + ' ' + alert.title : header;
        this.alerts.push(alert);
      })
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.some(a => a.id === alert.id)) return;
    this.alerts = this.alerts.filter(a => a.id !== alert.id);
  }

  cssClass(alert: Alert) {
    if (!alert) return;
    const classes: string[] = [];
    const cssClass = this.getAlertStyle(alert)[0];
    classes.push(cssClass);
    return classes.join(' ');
  }

  getAlertStyle(alert: Alert) {
    if (!alert) return ['', ''];
    const alertTypeClassAndHeader: {[key in AlertTypes]: string[]} = {
      [AlertTypes.Success]: ['bg-success text-light', '👍'],
      [AlertTypes.Danger]: ['bg-danger text-light', '💥'],
      [AlertTypes.Info]: ['', 'ℹ️'],
      [AlertTypes.Warn]: ['bg-warning text-light', '❗'],
      [AlertTypes.Loading]: ['', '⏳'],
    }
    return alertTypeClassAndHeader[alert.type];
  }

}
