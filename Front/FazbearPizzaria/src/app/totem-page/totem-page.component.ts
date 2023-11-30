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

@Component({
  selector: 'app-totem-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ScrollingModule],
  templateUrl: './totem-page.component.html',
  styleUrl: './totem-page.component.css'
})
export class TotemPageComponent implements OnInit {

  prodList: any
  cart : CartData[] = []
  emptyCart : CartData[] = []
  // obj: CartData = {id: number
  //   nome: string;
  //   tipo: string;
  //   preco: number;
  //   descricao: string;
  //   quantity: number;
  //   imageId: number;}
  constructor(
    public dialog: MatDialog,
    private service: InitProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.initProducts()
      .subscribe( (data) => {
        this.prodList = data;
        localStorage.setItem('prodList', JSON.stringify(this.prodList))
      });
      console.log(this.cart)
    // localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  cartAddItem(item : any) {
    // TALVEZ PRECISE DE MAIS IMPLEMENTACAO!!
    this.cart.push(item);
    localStorage.setItem('cart', JSON.stringify(this.cart))
    // this.router.navigate(['totem']);

    console.log('fofo')
  }

  cartRemoveItem() {

  }

  cleanCart (){
    localStorage.setItem('cart', JSON.stringify(this.emptyCart))
    var storedData = localStorage.getItem('cart');
      if (storedData == null)
        return
    this.cart = JSON.parse(storedData)
    console.log('to tentando aq po')
    this.router.navigate(['totem']); // REDIRECIONAR PARA PRE-TOTEM

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
