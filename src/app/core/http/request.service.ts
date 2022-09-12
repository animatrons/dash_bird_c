import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptionsDTO } from './HttpOptionsDTO';
import { Observable } from 'rxjs';

interface HttpOptions {
  headers?: any;
  params?: any;
}

@Injectable()
export class RequestService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  get<T>(uri: string, requestDto?: HttpOptionsDTO): Observable<T> {
    const options: HttpOptions = this.getRequestOptions(requestDto);
    return this.httpClient.get<T>(this.baseUrl + uri, options);
  }

  put<T>(uri: string, requestDto?: HttpOptionsDTO) {
    const options: HttpOptions = this.getRequestOptions(requestDto);
    const body = requestDto?.getBody;
    return this.httpClient.put<T>(this.baseUrl + uri, body, options);
  }

  post<T>(uri: string, requestDto?: HttpOptionsDTO) {
    const options: HttpOptions = this.getRequestOptions(requestDto);
    const body = requestDto?.getBody;
    return this.httpClient.post<T>(this.baseUrl + uri, body, options);
  }

  delete(uri: string, requestDto?: HttpOptionsDTO) {
    const options: HttpOptions = this.getRequestOptions(requestDto);
    return this.httpClient.delete(this.baseUrl + uri, options);
  }

  private getRequestOptions(requestDto?: HttpOptionsDTO): HttpOptions {
    let options: HttpOptions = {};
    if (requestDto) {
      const paramsMap = requestDto.getParams;
      const headersMap = requestDto.getHeaders;

      let params: any = {};
      paramsMap.forEach((v, k) => {
        // if (!params.has(k)) {
        //   params.append(k, v);
        // } else params.set(k, v);
        params[k] = v;
      });
      let headers = new HttpHeaders();
      headersMap.forEach((v, k) => {
        if (!headers.has(k)) {
          headers.append(k, v);
        } else headers.set(k, v);
      });
      options = { headers: headers, params: params };
    }
    return options;
  }
}
