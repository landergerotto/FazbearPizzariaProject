import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-totem-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pre-totem-page.component.html',
  styleUrl: './pre-totem-page.component.css'
})
export class PreTotemPageComponent {

  constructor(
    private router: Router
  ) { }

  goToTotem() {
    this.router.navigate(["totem"])
  }
}
