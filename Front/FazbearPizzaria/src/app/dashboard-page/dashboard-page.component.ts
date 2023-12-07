import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { Chart1Data } from '../model/chart1-data';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, BarChartComponent, LineChartComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
