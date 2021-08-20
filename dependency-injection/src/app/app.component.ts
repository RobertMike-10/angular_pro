import { Component } from '@angular/core';
import { FoodStoreService } from './food-store/food-store.service';
import { IStore } from './food-store-model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  styles: [`
    pizza-viewer,
    side-viewer,
    drink-viewer {
      display: block;
      border-bottom: 2px solid #eee;
      padding: 20px 0;
    }
  `],
  template: `
    <div>
      Food Store ({{ (store | async)?.name }})
    </div>
    <div>
      <pizza-viewer></pizza-viewer>
      <side-viewer></side-viewer>
      <drink-viewer></drink-viewer>
    </div>
  `
})
export class AppComponent {
  store:Observable<IStore> = this.foodService.getStore();
  constructor(private foodService: FoodStoreService) {}
}
