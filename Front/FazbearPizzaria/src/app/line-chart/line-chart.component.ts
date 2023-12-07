import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit{
  chart: any;

  constructor (
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.createChart();
  }

  public x2: number[] = [];
  public y2: number[] = [];

  createChart() {
    this.orderService.getChart2().subscribe((data: any) => {
       data.x_label.forEach((element: any) => {
         this.x2.push(element);
       });

       this.orderService.getChart2().subscribe((data: any) => {
         data.y_label.forEach((element: any) => {
           this.y2.push(element);
         });

         this.chart = new Chart("1", {
           type: 'line', //this denotes tha type of chart

           data: {// values on X-Axis
             labels: Object.assign(this.x2),
             datasets: [
               {
                 label: "Valor",
                 data: Object.assign(this.y2),
                 backgroundColor: 'limegreen'
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
