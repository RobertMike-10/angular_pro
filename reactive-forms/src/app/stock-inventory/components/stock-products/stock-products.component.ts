import { Component, EventEmitter, Input,Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IProduct, IStock} from '../../models/product.interface'
@Component({
  selector: 'stock-products',
  styleUrls: ['stock-products.component.scss'],
  template: `
  <div class="stock-product" [formGroup] = "parent">
  <div formArrayName="stock">
      <div *ngFor="let item of stocks; let i=index">
         <div class="stock-product__content"[formGroupName]="i">
            <div class="stock-product__name">
              {{getProduct(item.value.product_id)?.name}}
            </div>
            <div class="stock-product__price">
              {{getProduct(item.value.product_id)?.price | currency:'USD':true}}
            </div>
           <!-- <input type="number" style="margin:5px;" step="10" min="10" max="5000"
            formControlName="quantity"> !-->
            <stock-counter [step]="10" [min]="10" [max]="5000"
              formControlName="quantity"></stock-counter>
            <button type="button"
            (click)="OnRemove(item,i)">
               Remove
            </button>
         </div>
      </div>
  </div>
  </div>
  `})

export class StockProductsComponent {
  @Input()
  parent!: FormGroup;

  @Input()
  mapProduct!: Map<number, IProduct>;

  @Output()
  Removed = new EventEmitter<any>();

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }

  getProduct(id:number){
   return this.mapProduct.get(id);
  }

  OnRemove(group:any, index:number){
   this.Removed.emit({group, index});
  }


}
