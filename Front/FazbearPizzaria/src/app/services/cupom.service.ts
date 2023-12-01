import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { CupomData } from '../model/cumpom-data';

@Injectable({
  providedIn: 'root'
})
export class CupomService {

constructor(private http: ApiClientService) { }

getDiscountByCode(code : CupomData) {
  return this.http.post('cupom', code)
}

registerCupom(data: CupomData)
{
  this.http.post('cupom/register', data)
    .subscribe(response => console.log(response))
}
}
