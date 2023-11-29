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

  constructor(
    public dialog: MatDialog,
    private service: InitProductService
  ) { }

  ngOnInit(): void {
    this.service.initProducts();
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
        description: this.description,
      })

      this.dialogRef.close()
  }
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-produtos-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './prom-modal-page.component.html',
  styleUrl: './produtos-page.component.css'
})
export class PromDialog
{
  // name: string = ""
  // type: string = ""
  // price: number = 0
  // description : string = "";

  constructor(public dialogRef: MatDialogRef<PromDialog>,
    private client: ClientServiceService
    ) {}

    foods: Food[] = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'},
    ];
}
