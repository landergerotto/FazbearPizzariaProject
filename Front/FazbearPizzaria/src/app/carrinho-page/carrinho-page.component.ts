import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho-page.component.html',
  styleUrl: './carrinho-page.component.css'
})
export class CarrinhoPageComponent {

  constructor(
    private router: Router,
  ) { }

  goToTotem()
  {
    this.router.navigate(["totem"])
  }
}
