export class Alert {
  id!: string;
  title!: string;
  message!: string;
  type!: AlertTypes;
  autoClose: boolean;
  delay: number;
  keepAfterRouteChange?: boolean = false;
  constructor(init?: Partial<Alert>) {

    this.autoClose = false;
    this.delay = 5000;
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
