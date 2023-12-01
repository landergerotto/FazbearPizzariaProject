import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartData } from '../model/product-table-data';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CupomService } from '../services/cupom.service';

@Component({
  selector: 'app-carrinho-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './carrinho-page.component.html',
  styleUrl: './carrinho-page.component.css'
})
export class CarrinhoPageComponent implements OnInit {

  cart : CartData[] = [];
  totalPrice : number = 0;
  cupom: string = 'a';

  constructor(
    private router: Router,
    private service: CupomService
  ) { }

  ngOnInit(): void {
    var storedData = localStorage.getItem('cart');
    if (storedData == null)
        return;
    var data = JSON.parse(storedData)
    this.cart = data;

    this.updatePrice()

    console.log(this.totalPrice)
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

    this.updatePrice()

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
    this.updatePrice()

  }

  updatePrice() {
    this.totalPrice = 0;
    this.cart.forEach ( (obj : CartData) => {
      this.totalPrice += obj.preco * obj.quantidade
    })
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  cartRemoveItem(id : number) {
    this.cart = this.cart.filter( obj => {return obj.id !== id} );
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  applyCupom() {
    console.log(this.cupom)
    this.service.getDiscountByCode({
      codigo: this.cupom,
      desconto: 0
    })
      .subscribe( (data) => {
        console.log(data);
      });
  }

  goToTotem()
  {
    this.router.navigate(["totem"])
  }
}
