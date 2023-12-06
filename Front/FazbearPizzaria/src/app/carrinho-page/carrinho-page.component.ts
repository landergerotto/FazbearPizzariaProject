import { jwtDecode } from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartData } from '../model/product-table-data';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CupomService } from '../services/cupom.service';
import { JwtService } from '../services/jwt.service';
import { OrderService } from '../services/order.service';
import { OrderData } from '../model/order-data';

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
  cupom: string = '';
  discount: number = 0;
  applied: boolean = false;
  discPrice: number = 0;

  constructor(
    private router: Router,
    private cupService: CupomService,
    private orderService: OrderService,
    private jwt: JwtService
  ) { }

  ngOnInit(): void {
    var storedData = localStorage.getItem('cart');
    if (storedData == null)
        return;
    var data = JSON.parse(storedData)
    this.cart = data;

    this.updatePrice()


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
    this.discPrice = this.totalPrice;
    this.applied = false;
  }

  cartRemoveItem(id : number) {
    this.cart = this.cart.filter( obj => {return obj.id !== id} );
    localStorage.setItem('cart', JSON.stringify(this.cart))
    if (this.cart.length == 0)
      this.goToTotem()
  }

  applyCupom() {
    this.cupService.getDiscountByCode({
      codigo: this.cupom,
      desconto: 0
    })
      .subscribe( (data) => {
        this.discount = parseFloat(<string>data);
        if (!this.applied) {
          this.discPrice = this.totalPrice * (1 - this.discount);
          this.applied = !this.applied
        }

      });
  }

  createOrder() {

    var list: OrderData[] = [];

    this.cart.forEach( (item) => {
      // console.log(obj.produtoId)
      list.push({
        precoTotal: this.discPrice,
        pedidoId: 0,
        produtoId: item.id,
        quantidade: item.quantidade,
      })

    })
    console.log(list)

    this.orderService.registerOrder(list);

    localStorage.setItem('cart', JSON.stringify([]))

    this.goToTotem();
  }

  goToTotem()
  {
    this.router.navigate(["pretotem"])
  }
}
