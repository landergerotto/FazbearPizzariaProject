import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartData } from '../model/product-table-data';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carrinho-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './carrinho-page.component.html',
  styleUrl: './carrinho-page.component.css'
})
export class CarrinhoPageComponent implements OnInit {

  cart : CartData[] = []
  precoTotal : number = 0;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    var storedData = localStorage.getItem('cart');
    if (storedData == null)
        return;
    var data = JSON.parse(storedData)
    this.cart = data;
    console.log(data)
  }

  addQuantity (id : number) {
    var storedData = localStorage.getItem('cart');
    if (storedData == null)
        return;
    var data = JSON.parse(storedData)
    data.forEach((item : CartData ) => {
      if (item.id == id)
        item.quantidade += 1;
    });
    console.log(data)
    this.cart = data;
    localStorage.setItem('cart', JSON.stringify(data))
  }

  removeQuantity(id : number) {
    var storedData = localStorage.getItem('cart');
    if (storedData == null)
        return;
    var data = JSON.parse(storedData)
    data.forEach((item : CartData )=> {
      if (item.id == id) {
        item.quantidade -= 1;
        this.cart = data
        localStorage.setItem('cart', JSON.stringify(data))
      }
      if (item.quantidade == 0) {
       this.cartRemoveItem(id);
      }
    });

  }

  cartRemoveItem(id : number) {
    this.cart = this.cart.filter( obj => {return obj.id !== id} );
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  goToTotem()
  {
    this.router.navigate(["totem"])
  }
}
