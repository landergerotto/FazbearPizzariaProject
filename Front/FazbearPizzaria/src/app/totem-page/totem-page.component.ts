import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-totem-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ScrollingModule],
  templateUrl: './totem-page.component.html',
  styleUrl: './totem-page.component.css'
})
export class TotemPageComponent {
  items = Array.from({length: 100}).map((_, i) => `Item #${i}`);
}
