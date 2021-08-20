import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { API_TOKEN } from './token';
//import 'rxjs/add/operator/map';

const URL:string = 'http://localhost:3000';

@Injectable()
export class FoodService {
  constructor(
    private httpClient: HttpClient,
    @Inject('api') private api:string
    //@Inject(API_TOKEN) private api: string
  ) {}

  getFood(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api);
  }

  getSides(): Observable<any[]> {
    return this.httpClient.get<any[]>(URL+'/api/sides');

  }
  getPizzas(): Observable<any[]> {
    return this.httpClient.get<any[]>(URL+'/api/pizzas');

  }
  getDrinks(): Observable<any[]> {
    return this.httpClient.get<any[]>(URL+'/api/drinks');

  }
}
