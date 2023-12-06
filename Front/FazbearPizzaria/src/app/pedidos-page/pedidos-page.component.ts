import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KitchenData } from '../model/kitchen-data';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

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
    private orderService: OrderService,
    private router: Router
  ) { }
  private pollInterval = 10000; // 10 second

  ngOnInit(): void {
    timer(0, this.pollInterval).subscribe(() => {
      this.orderService.getAllOrders()
        .subscribe( (data: any) => {
          this.orders = data;
      })
    })
  }

  PreparedOrder(order_id: number) {
    this.orderService.PreparedOrder({
      pedidoId: order_id
    })
    this.reloadPage();
  }

  FinishedOrder(order_id: number) {
    this.orderService.FinishedOrder({
      pedidoId: order_id
    })
    this.reloadPage();

  }

  reloadPage() {
    window.location.reload()

  }

}
