
import { Component, forwardRef, Input} from '@angular/core';
import {ControlContainer, ControlValueAccessor,NG_VALUE_ACCESSOR} from '@angular/forms'

const COUNTER_CONTROL_ACCESOR = {
 provide: NG_VALUE_ACCESSOR,
 useExisting: forwardRef(()=> StockCounterComponent),
 multi:true
};
@Component({
  selector: 'stock-counter',
  providers:[COUNTER_CONTROL_ACCESOR],
  styleUrls: ['stock-counter.component.scss'],
  template: `
  <div class="stock-counter"
    [class.focused]="focus">
     <div>
        <div tabindex="0"
        (keydown)="onKeyDown($event)"
        (blur)="onBlur($event)"
        (focus)="onFocus($event)">
          <p>{{value }} </p>
          <div>
            <button type="button"
            (click)="increment()"
            [disabled]="value===max">
              +
            </button>
            <button type="button"
            (click)="decrement()"
            [disabled]="value===min">
              -
            </button>
          </div>
        </div>
     </div>
  </div>
           `})
export class StockCounterComponent implements  ControlValueAccessor{

  private onTouch!: Function;
  private onModelChange!: Function;

  //Write the value recived
  writeValue(value: any): void {
    this.value =  value || 0;
  }
  //binding function to return the value to the outside property
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }
  //tell is touched and dirty
  registerOnTouched(fn: Function): void {
   this.onTouch = fn;
  }
  @Input()  step:number=10;
  @Input()  min:number=10;
  @Input()  max:number=5000;

  value:number=10;
  focus:boolean=false;

  onKeyDown(event:KeyboardEvent){
   const handlers:Map<string,Function> = new Map<string,Function>();
   handlers.set("ArrowUp",()=> this.increment());
   handlers.set("ArrowDown",()=> this.decrement());
   console.log(event.code);
   if (handlers.has(event.code))
   {
    handlers.get(event.code)!();
    event.preventDefault();
    event.stopPropagation();
   }
   this.onTouch();
  }
  onBlur(event:FocusEvent){
   this.focus=false;
   event.preventDefault();
   event.stopPropagation();
   this.onTouch();
   console.log("Blur");
  }
  onFocus(event:FocusEvent){
    this.focus=true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
    console.log("Focus" + this.focus);
  }
  increment(){
    if (this.value<this.max)
    {
     this.value  += this.step;
     this.onModelChange(this.value);
    }
    this.onTouch();
  }
  decrement(){
    if (this.value> this.min)
    {this.value  -= this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
}
