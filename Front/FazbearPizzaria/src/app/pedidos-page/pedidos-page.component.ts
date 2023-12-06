import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KitchenData } from '../model/kitchen-data';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './pedidos-page.component.html',
  styleUrl: './pedidos-page.component.css'
})
export class PedidosPageComponent implements OnInit {

  orders: KitchenData[] = [];

  constructor (
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderService.getAllOrders()
      .subscribe( (data: any) => {
        this.orders = data;
        console.log(this.orders)
    })
  }

  PreparedOrder(item: KitchenData) {
    
  }

  reloadPage() {
    window.location.reload()
  }

}
