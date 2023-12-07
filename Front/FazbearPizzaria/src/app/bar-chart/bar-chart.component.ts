import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { OrderService } from '../services/order.service';

@Component({
 selector: 'app-bar-chart',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './bar-chart.component.html',
 styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor (
    private orderService: OrderService
  ) { }

  chart1: any;


 x1: string[] = []
 y1: number[] = []


 ngOnInit(): void {
    this.createChart();
 }

 createChart() {
  this.orderService.getChart1().subscribe((data: any) => {
     data.x_label.forEach((element: any) => {
       this.x1.push(element);
     });

     this.orderService.getChart1().subscribe((data: any) => {
       data.y_label.forEach((element: any) => {
         this.y1.push(element);
       });

       console.log(typeof(Object.assign(this.x1)));
       console.log(this.y1);

       this.chart1 = new Chart("2", {
         type: 'bar', //this denotes tha type of chart

         data: {// values on X-Axis
           labels: Object.assign(this.x1),
           datasets: [
             {
               label: "Quantidade Vendida",
               data: Object.assign(this.y1),
               backgroundColor: 'orange'
             }
           ]
         },
         options: {
           aspectRatio:2.5

         }
       });
     });
  });
 }
}
