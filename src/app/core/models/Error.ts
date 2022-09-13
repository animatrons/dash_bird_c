export class TechnicalError {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

  public get getMessage() : string {
    return this.message;
  }

  public get getCode() : number {
    return this.code;
  }

}
