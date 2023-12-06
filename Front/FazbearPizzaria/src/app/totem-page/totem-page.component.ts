import { MatCardModule } from '@angular/material/card';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { InitProductService } from '../services/init-product.service';
import { Router } from '@angular/router';
import { CartData } from '../model/product-table-data';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-totem-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ScrollingModule],
  templateUrl: './totem-page.component.html',
  styleUrl: './totem-page.component.css'
})
export class TotemPageComponent implements OnInit {

  prodList: any;
  promoList: any;
  cart : CartData[] = [];
  emptyCart : CartData[] = [];
  constructor(
    public dialog: MatDialog,
    private iProdservice: InitProductService,
    private promService: PromotionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.iProdservice.initProducts()
      .subscribe( (data) => {
        this.prodList = data;
      });
      this.promService.getPromotion()
      .subscribe( (data) => {
        this.promoList = data;

      });

      var storedData = localStorage.getItem('cart');
      if (storedData == null) {
        return
      }
      this.cart = JSON.parse(storedData);
      console.log(this.cart)
    // localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  cartAddItem(item : any) {
    // TALVEZ PRECISE DE MAIS IMPLEMENTACAO!!
    var count = 0;
    this.cart.forEach ( (obj : CartData) => {
      if (obj.id == item.id) {
        count = 1;
        console.log('elp')
      }
    })
    if (count == 1)
      return;
    this.cart.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cart))
    // this.router.navigate(['totem']);

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

  cleanCart (){
    localStorage.setItem('cart', JSON.stringify(this.emptyCart))
    var storedData = localStorage.getItem('cart');
      if (storedData == null)
        return
    this.cart = JSON.parse(storedData)
    this.router.navigate(['totem']); // REDIRECIONAR PARA PRE-TOTEM

  }

  goToCart() {
    if (this.cart.length == 0)
      return
    this.router.navigate(['cart'])
  }

  confirmOpen( cart : CartData[])
  {
    this.dialog.open(ConfirmDialog);
  }

  get getCart() {
    return this.cart
  }

}

@Component({
  selector: 'app-totem-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './confirm-modal-page.component.html',
  styleUrl: './totem-page.component.css'
})
export class ConfirmDialog
{
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>
    ) {}

  // cleanCart (){
  //   localStorage.setItem('cart', JSON.stringify([]))
  //   var storedData = localStorage.getItem('cart');
  //     if (storedData == null)
  //       return
  //   var a = TotemPageComponent
  //   TotemPageComponent.getCart() = JSON.parse(storedData)
  //   console.log('to tentando aq po')
  //   this.router.navigate(['totem']); // REDIRECIONAR PARA PRE-TOTEM

  // }

  closeModal() {
    this.dialogRef.close(ConfirmDialog);
  }

}
