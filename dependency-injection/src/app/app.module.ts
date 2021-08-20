import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { FoodStoreModule } from './food-store/food-store.module';
import { PizzaViewerComponent } from './containers/pizza-viewer.component';
import { DrinkViewerComponent } from './containers/drink-viewer.component';
import { SideViewerComponent } from './containers/side-viewer.component';

import { AppComponent } from './app.component';
import { API_TOKEN } from './token';

@NgModule({
  declarations: [
    AppComponent,
    PizzaViewerComponent,
    DrinkViewerComponent,
    SideViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FoodStoreModule.forRoot({
      storeId: 10292,
      storeToken: 'eca938c99a0e9ff91029dc'
    })
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: API_TOKEN, useValue: 'http://localhost:3000/api/pizzas' }
  ]
})
export class AppModule {}
