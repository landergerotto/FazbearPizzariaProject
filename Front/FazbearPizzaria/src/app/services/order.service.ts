import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { OrderData } from '../model/order-data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: ApiClientService) { }

  getAllOrders ()
  {
    return this.http.get('order')
  }

  registerOrder(data: OrderData[])
  {
    this.http.post('order/register', data)
      .subscribe(response => console.log(response))
  }

  alterOrder(data: any) {

  }
}
