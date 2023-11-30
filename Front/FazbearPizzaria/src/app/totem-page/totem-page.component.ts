import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { InitProductService } from '../services/init-product.service';

@Component({
  selector: 'app-totem-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ScrollingModule],
  templateUrl: './totem-page.component.html',
  styleUrl: './totem-page.component.css'
})
export class TotemPageComponent implements OnInit {

  list: any
  cart : any = []
  obj = {}
  constructor(
    private service: InitProductService
  ) { }

  ngOnInit(): void {
    this.service.initProducts()
      .subscribe( (data) => {
        this.list = data;
        localStorage.setItem('prodList', JSON.stringify(this.list))
      });
      localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  buttonClick(item : any) {
    console.log('fofo')
  }

}
