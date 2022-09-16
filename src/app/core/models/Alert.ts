import { Observable } from "rxjs";

export class Alert {
  id!: string;
  title!: string;
  message!: string;
  type!: AlertTypes;
  autoClose: boolean;
  delay: number;
  keepAfterRouteChange?: boolean = false;
  autoClose$: Observable<boolean> | null;
  loading: boolean;
  constructor(init?: Partial<Alert>) {
    this.autoClose = false;
    this.delay = 5000;
    this.autoClose$ = null;
    this.loading = false;
    Object.assign(this, init);
  }
}

export enum AlertTypes {
  Success,
  Danger,
  Warn,
  Info,
  Loading
}
