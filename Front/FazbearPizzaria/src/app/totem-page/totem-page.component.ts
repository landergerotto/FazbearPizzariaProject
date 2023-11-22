import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-totem-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './totem-page.component.html',
  styleUrl: './totem-page.component.css'
})
export class TotemPageComponent {

}
