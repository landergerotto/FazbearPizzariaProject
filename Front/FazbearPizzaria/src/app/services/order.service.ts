import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { OrderData } from '../model/order-data';
import { OrderStatusData } from '../model/order-status-data';

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

  PreparedOrder(data: OrderStatusData) {
    this.http.put('order/status/prepared', data)
      .subscribe(response => console.log(response))
  }

  FinishedOrder(data: OrderStatusData) {
    this.http.put('order/status/done', data)
      .subscribe(response => console.log(response))
  }

  getChart1() {
    return this.http.get('order/chart1')
  }
  getChart2() {
    return this.http.get('order/chart2')
  }
}
