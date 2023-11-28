import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { ProductData } from '../model/product-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: ApiClientService) { }

  registerProd(data: ProductData)
  {
    this.http.post('user/register', data)
      .subscribe(response => console.log(response))
  }


}
