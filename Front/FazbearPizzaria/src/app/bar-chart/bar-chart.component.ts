import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
 selector: 'app-bar-chart',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './bar-chart.component.html',
 styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
 chart1: any;

 ngOnInit(): void {
    this.createChart();
 }

 createChart() {
    this.chart1 = new Chart("2", {
      type: 'bar',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
                 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
                    '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
                    '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
 }
}
