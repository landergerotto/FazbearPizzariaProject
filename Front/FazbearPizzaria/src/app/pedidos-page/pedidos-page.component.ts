import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './pedidos-page.component.html',
  styleUrl: './pedidos-page.component.css'
})
export class PedidosPageComponent {

}
