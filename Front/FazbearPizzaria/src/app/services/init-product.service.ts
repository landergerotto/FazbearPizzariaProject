import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class InitProductService {

  constructor(private http: ApiClientService) { }

  initProducts() {
    console.log("me chamaram kkkkkk")
    // this.http.get("")

  }

}
