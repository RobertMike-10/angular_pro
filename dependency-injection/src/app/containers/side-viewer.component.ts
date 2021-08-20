import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FoodService } from '../food.service';

interface Side {
  name: string,
  price: number
}

@Component({
  selector: 'side-viewer',
  providers: [
    {provide:FoodService,
      useFactory:(httpClient:HttpClient) => {
        return new FoodService(httpClient,'http://localhost:3000/api/sides');},
      deps:[HttpClient]
      }
  ],
  template: `
    <div>
      <div *ngFor="let item of items$ | async">
        {{ item.name }} {{ item.price | currency:'USD':true }}
      </div>
    </div>
  `
})
export class SideViewerComponent implements OnInit {
  items$!: Observable<Side[]>;
  constructor(private foodService: FoodService) {}
  ngOnInit() {
    this.items$ = this.foodService.getFood();
  }
}
