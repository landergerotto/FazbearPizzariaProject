import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { PromotionData } from '../model/promotion-data';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: ApiClientService) { }

  getPromotion () {
    return this.http.get('promotion');
  }

  registerProm(data: PromotionData)
  {
    this.http.post('promotion/register', data)
      .subscribe(response => console.log(response))
  }
}
