import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { IProduct, IStock } from '../models/product.interface';

const STOCK_API:string='http://localhost:3000';

@Injectable()
export class StockInventoryService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getCartItems(): Observable<IStock[]> {
    return this.httpClient
      .get<IStock[]>(STOCK_API+'/cart').pipe(
        catchError((error: any) => Observable.throw(error.json())));
  }

  getProducts(): Observable<IProduct[]> {
    return this.httpClient
      .get<IProduct[]>(STOCK_API+'/products').pipe(
      catchError((error: any) => Observable.throw(error.json())));
  }

  checkBranchId(id: string): Observable<boolean> {
    //let search = new URLSearchParams();
    //search.set('id', id);
    let url = STOCK_API+'/branches/'+id
    console.log(url);
    return this.httpClient
      .get<boolean>(url).pipe(
        catchError((error: any) => Observable.throw(error.json())));
  }

}
