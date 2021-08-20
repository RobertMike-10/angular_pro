import { Component,Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IProduct, IStock } from '../../models/product.interface'
@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
   <div class="stock-selector" [formGroup] = "parent">
   <div formGroupName="selector">
      <select formControlName="product_id">
         <option value="">Select stock</option>
         <option *ngFor="let product of products"
          [value]="product.id">
          {{product.name}}
          </option>
      </select>
      <!--<input type="number" style="margin:5px;" step="10" min="10" max="5000"
      formControlName="quantity"> !-->
      <stock-counter [step]="10" [min]="10" [max]="5000"
      formControlName="quantity">
      </stock-counter>
      <button type="button"
      (click)="OnAdd()"
      [disabled]="stockExists  || notSelected">
        Add stock
      </button>
      <div class ="stock-selector__error"
       *ngIf="stockExists">
        Item already exists on the stock
      </div>
   </div>
   </div>
  `})

export class StockSelectorComponent {
  @Input()
  parent!: FormGroup;
  @Input()
  products!: IProduct[];

  @Output()
  Added = new EventEmitter<IStock>();

  get stockExists(){
    return (this.parent.hasError('stockExists') &&
     this.parent.get('selector.product_id')!.dirty);
  }
  get notSelected(){
    return !this.parent.get('selector.product_id')!.value;
  }
  OnAdd(){

    this.Added.emit(this.parent.get('selector')?.value);
    //with this we have untouched, pristine
    this.parent.get('selector')!.reset({
      product_id:'',
      quantity:10
    });
    this.parent.get('selector')!.patchValue({
      quantity:100,
    });
    //this option needs all teh properties
    /*this.parent.get('selector')!.setValue({
      product_id:'',
      quantity:100,
    });*/
  }
}
