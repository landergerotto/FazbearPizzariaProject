import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { KitchenData } from '../model/kitchen-data';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
    this.orderService.getAllOrders()
      .subscribe( (data: any) => {
        this.orders = data;
        console.log(this.orders)
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

  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
   console.log("Current route I am on:",this.router.url);
   const url=self ? this.router.url :urlToNavigateTo;
   this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
     this.router.navigate([`/${url}`]).then(()=>{
       console.log(`After navigation I am on:${this.router.url}`)
     })
   })
 }
}
