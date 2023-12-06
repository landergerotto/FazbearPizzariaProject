import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { OrderService } from '../services/order.service';
import { KitchenData } from '../model/kitchen-data';

@Component({
  selector: 'app-pedido-page-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-page-user.component.html',
  styleUrl: './pedido-page-user.component.css'
})
export class PedidoPageUserComponent implements OnInit {

  constructor(
    private orderService: OrderService
  ) { }

  private pollInterval = 1000; // 1 second

  orders: KitchenData[] = [];
  preparing: any = []
  ready: any = []

  ngOnInit() {
    timer(0, this.pollInterval).subscribe(() => {
      this.orderService.getAllOrders()
      .subscribe( (data: any) => {
        this.orders = data;
        this.preparing = []
        this.ready = []

        this.orders.forEach(element => {
          if (element.pronto == false)
            this.preparing.push(element.orderID)
            if (element.pronto == true && element.entregue == false)
            this.ready.push(element.orderID)
        });
    })
      // Update the component's view here...
    });
  }
}
