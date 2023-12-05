import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { PromotionService } from '../services/promotion.service';
import { InitProductService } from '../services/init-product.service';
import { MatDialog } from '@angular/material/dialog';
import { CupomService } from '../services/cupom.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {
  constructor(
    private inProdservice: InitProductService,
    private promService: PromotionService,
    private cupService: CupomService

) { }

list: any
promotions: any
cupons: any

  ngOnInit() {
    this.inProdservice.initProducts()
      .subscribe( (data) => {
        this.list = data;
      });
      this.promService.getPromotion()
      .subscribe( (data) => {
        this.promotions = data;
      });
      this.cupService.getAllCupom()
      .subscribe( (data) => {
        this.cupons = data;
        console.log(this.cupons)
      });
  }
}
