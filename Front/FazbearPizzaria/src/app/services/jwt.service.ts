import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { ProductData } from '../model/product-data';
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  name: string;
 }

@Injectable({
  providedIn: 'root'
})


export class JwtService {

  constructor(private http: ApiClientService) { }


  decodeJwt (token: string) {
    return jwtDecode<DecodedToken>(token)
  }

}
