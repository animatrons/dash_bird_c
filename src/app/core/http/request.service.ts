import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {
  private baseUrl = '';
  constructor(private httpClient: HttpClient) {}

  get<T>(uri: string, requestDto?: HttpOptionsDTO) {
    const options = this.getRequestOptions(requestDto);
    return this.httpClient.get<T>(this.baseUrl + uri, options);
  }

  put<T>(uri: string, requestDto?: HttpOptionsDTO) {
    const options = this.getRequestOptions(requestDto);
    const body = requestDto?.getBody;
    return this.httpClient.put<T>(this.baseUrl + uri, body, options);
  }

  post<T>(uri: string, requestDto?: HttpOptionsDTO) {
    const options = this.getRequestOptions(requestDto);
    const body = requestDto?.getBody;
    return this.httpClient.post<T>(this.baseUrl + uri, body, options);
  }

  delete(uri: string, requestDto?: HttpOptionsDTO) {
    const options = this.getRequestOptions(requestDto);
    return this.httpClient.delete(this.baseUrl + uri, options);
  }

  private getRequestOptions(requestDto?: HttpOptionsDTO): any {
    let options;
    if (requestDto) {
      const paramsMap = requestDto.getParams;
      const headersMap = requestDto.getHeaders;

      let params = new HttpParams();
      paramsMap.forEach((v, k) => {
        params.set(k, v);
      });
      let headers = new HttpHeaders();
      headersMap.forEach((v, k) => {
        headers.set(k, v);
      });
      options = { headers, params };
    }
    return options;
  }
}
