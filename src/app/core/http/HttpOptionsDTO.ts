class HttpOptionsDTO {
  params: Map<string, string>;
  headers?: Map<string, string>;
  body?: any;

  addParam(k: string, v: string): HttpOptionsDTO {
    if (this.params == undefined) {
      this.params = new Map<string, string>();
    }
    this.params?.set(k, v);
    return this;
  }

  addHeader(k: string, v: string): HttpOptionsDTO {
    if (this.headers == undefined) {
      this.headers = new Map<string, string>();
    }
    this.headers.set(k, v);
    return this;
  }

  deleteHeader(k: string) {
    this.headers?.delete(k);
  }

  deleteParam(k: string) {
    this.params?.delete(k);
  }

  public set setParams(v :  Map<string, string>) {
    this.params = v;
  }

  public set setBody(v : any) {
    this.body = v;
  }

  public set setHeaders(v :  Map<string, string>) {
    this.headers = v;
  }

  public get getParams() : Map<string, string> {
    return this.params ?? new Map<string, string>();
  }

  public get getHeaders() : Map<string, string> {
    return this.headers ?? new Map<string, string>();
  }

  public get getBody() : any {
    return this.body ?? {};
  }

  constructor() {
    this.params = new Map<string, string>();
    this.headers = new Map<string, string>();
    this.body = {};
  }
}
