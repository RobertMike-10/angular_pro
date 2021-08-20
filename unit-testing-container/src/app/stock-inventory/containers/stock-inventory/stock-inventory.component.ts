import { Component ,OnInit} from '@angular/core';
import { FormControl,FormGroup, FormArray, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms';
import { IProduct, IStock} from '../../models/product.interface'

import {Observable } from 'rxjs';
import { StockInventoryService } from '../../services/stock.inventory.services';
import { forkJoin } from 'rxjs';

import { distinctUntilChanged,debounceTime } from 'rxjs/operators';
import {StockValidators} from './stock-inventory.validator'
import { map } from 'rxjs/operators';

import { MyBranchValidator } from './branch.validator';
@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.css'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit">
        <stock-branch
        [parent]="form">
        </stock-branch>
        <stock-selector
        [parent]="form"
        [products]="products"
        (Added)="addStock($event)">
        </stock-selector>
        <stock-products
        [parent]="form"
        [mapProduct] ="productMap"
        (Removed)="removeStock($event)">
        </stock-products>

        <div class="stock-inventory__price">
          Total: {{total | currency:'USD':true}}
        </div>
      <div class="stock-inventory__buttons">
        <button type="submit"
        [disabled]="form.invalid">
          Order Stock
      </button>
      </div>


      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit{

  products!: IProduct[];
  /* products: IProduct[]=[
     {"id":1,"price": 34456.7, name:"MacBook Pro"},
     {"id":2,"price": 14296.7, name:"Dell inspiron"},
     {"id":3,"price": 17659.4, name:"Lenovo DockStation"},
     {"id":4,"price": 16582.5, name:"Acer Aspire"},
     {"id":5,"price": 19198.3, name:"Asus Pegasus"}
   ]*/

   /*form = new FormGroup({
    store : new FormGroup({
     branch: new FormControl(''),
     code: new FormControl('')
    }),
    selector: this.createStock(),
    stock: new FormArray([
     this.createStock({product_id:1,quantity:10}),
     this.createStock({product_id:2,quantity:150}),
     this.createStock({product_id:3,quantity:50})

    ])
  })*/
  productMap!: Map<number, IProduct>;

  total!:number;
   form = this.formBuild.group({
     store : this.formBuild.group({
      branch: ['',[Validators.required, StockValidators.checkBranch], this.branchValidator.validate.bind(this.branchValidator)],
      code: ['',Validators.required]
     }),
     selector: this.createStock(),
     stock: this.formBuild.array([
      /*this.createStock({product_id:1,quantity:10}),
      this.createStock({product_id:2,quantity:150}),
      this.createStock({product_id:3,quantity:50})*/
     ])
   },{validator:StockValidators.checkStockExists})

   constructor(private formBuild: FormBuilder,
    private stockService: StockInventoryService,
    private branchValidator: MyBranchValidator){

   }

   ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    //join two observables
    forkJoin(cart, products)
      .subscribe(([cart, products]: [IStock[], IProduct[]]) => {
        //we obtain the data from both observables
        //create a Map with the id and the object, to send to the other component
        const myMap = products
          .map<[number, IProduct]>(product => [product.id, product]);

        //products, and with quantity
        this.productMap = new Map<number, IProduct>(myMap);
        this.products = products;
        //Adding to the cart teh data readed
        cart.forEach(item => this.addStock(item));

        //calculateTotal
        this.calculateTotal(this.form.get('stock')!.value)
        this.form.get('stock')?.valueChanges.
        subscribe(value =>{
          this.calculateTotal(value);
        })
      });

  }

  calculateTotal(value: IStock[])
  {
    const total =  value.reduce((prev,next) =>{
      //console.log("prev:" + prev + " next:" + this.productMap.get(next.product_id)!.price);
      //var id:number = +next.product_id;
      return prev + (next.quantity * this.productMap.get(next.product_id)!.price);

    },0)
    this.total = total;
    console.log("Total");
  }
   /*createStock(stock?:IStock){
    return new FormGroup({
     product_id: new FormControl(stock?.product_id || ''),
     quantity: new FormControl(stock?.quantity || 10)
    })
  }*/

  async  validateBranchAsync(control:AbstractControl){
    let respuesta;
   await this.stockService.checkBranchId(control.value).subscribe((data:boolean)=>{
    respuesta= data ? null : { unknownBranch: true };
   });
   return respuesta;
  }

  validateBranch(control:AbstractControl){
    return
    this.stockService.checkBranchId(control.value).pipe(
      map((response: boolean) => response ? null : { unknownBranch: true }))
  }


   createStock(stock?:IStock){
     return this.formBuild.group({
      product_id: stock?.product_id || '',
      quantity: stock?.quantity || 10
     })
   }

   addStock(stock:IStock){
    const control =this.form.get('stock') as FormArray;
    //cleaning string to integer
    var id:number = +stock.product_id;
    control.push(this.createStock({product_id:id, quantity:stock.quantity }));
    console.log(control);
   }

   removeStock({group,index}:{group:FormGroup,index:number}){
    const control =this.form.get('stock') as FormArray;
    control.removeAt(index);
   }


   onSubmit(){

   }
}
