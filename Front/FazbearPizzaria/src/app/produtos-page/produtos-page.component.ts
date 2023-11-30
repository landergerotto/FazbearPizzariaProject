import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClientServiceService } from '../services/client.service';
import { HttpClient } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { ProductService } from '../services/product.service';
import { InitProductService } from '../services/init-product.service';

@Component({
  selector: 'app-produtos-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterOutlet, MatCardModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './produtos-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdutosPageComponent implements OnInit {

  list : any

  constructor(
    public dialog: MatDialog,
    private service: InitProductService
  ) { }

  ngOnInit() {
    this.service.initProducts()
      .subscribe( (data) => {
        this.list = data;
        localStorage.setItem('prodList', JSON.stringify(this.list))
      });
  }

  cadProd()
  {
    this.dialog.open(ProdDialog);
  }

  cadProm()
  {
    this.dialog.open(PromDialog);

  }

}
@Component({
  selector: 'app-produtos-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './prod-modal-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class ProdDialog
{
  name: string = ""
  type: string = ""
  price: number = 0
  description : string = "";

  constructor(public dialogRef: MatDialogRef<ProdDialog>,
    private prod: ProductService
    ) {}

  create()
  {   console.log(this.type)
    console.log(this.price)
    console.log(this.description)
      this.prod.registerProd({
        name: this.name,
        type: this.type,
        price: this.price,
        quantity: 1,
        description: this.description,
      })

      this.dialogRef.close()
  }
}

@Component({
  selector: 'app-produtos-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './prom-modal-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class PromDialog implements OnInit
{
  prodList : any

  constructor(public dialogRef: MatDialogRef<PromDialog>,
    private client: ClientServiceService
    ) {}

  ngOnInit(): void {
    var storedData = localStorage.getItem('prodList');
    if (storedData === null)
      return;
    var data = (JSON.parse(storedData))
    this.prodList = data
  }

}
