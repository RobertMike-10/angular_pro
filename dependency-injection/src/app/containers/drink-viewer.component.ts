import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FoodService } from '../food.service';

interface Drink {
  name: string,
  price: number
}

export abstract class DrinkService{
  getDrinks!:()=>Observable<Drink[]>
}

export function DrinkFactory(httpClient:HttpClient)  {
  return new FoodService(httpClient,'http://localhost:3000/api/drinks');}

@Component({
  selector: 'drink-viewer',
  providers: [
    {provide:FoodService,
    useFactory:DrinkFactory,
    deps:[HttpClient]
    },
    {provide:DrinkService, useExisting:FoodService}
  ],
  template: `
    <div>
      <div *ngFor="let item of items$ | async">
        {{ item.name }} {{ item.price | currency:'USD':true }}
      </div>
    </div>
  `
})
export class DrinkViewerComponent implements OnInit {
  items$!: Observable<Drink[]>;
  constructor(private foodService: DrinkService) {}
  ngOnInit() {
    //this.items$ = this.foodService.getFood();
    this.items$ = this.foodService.getDrinks();
  }
}
