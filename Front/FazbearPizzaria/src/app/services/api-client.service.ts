import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  backend = 'http://localhost:5232/'

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http
      .get(this.backend + url)
  }

  put(url: string, obj : any) {
    return this.http
      .put(this.backend + url, obj)
  }

  post(url: string, obj: any) {
    return this.http
      .post(this.backend + url, obj)
  }
}
