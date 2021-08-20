import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StockCounterComponent } from './stock-inventory/components/stock-counter/stock-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    StockCounterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
