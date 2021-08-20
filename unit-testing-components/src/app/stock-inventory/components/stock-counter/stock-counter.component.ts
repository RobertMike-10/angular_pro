import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'stock-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stock-counter">
      <div>
        <div
          (keydown)="onKeyUp($event)"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
          tabindex="0">
          <p>{{ value }}</p>
          <div tabindex="-1">
            <button type="button" tabindex="-1" (click)="increment()" [disabled]="value === max">
              +
            </button>
            <button type="button" tabindex="-1" (click)="decrement()" [disabled]="value === min">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StockCounterComponent {
  @Input() step: number = 1;
  @Input() min: number = 0;
  @Input() max: number = 200;

  @Output() changed = new EventEmitter<number>();

  value: number = 0;
  focused!: boolean;

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.changed.emit(this.value);
    }
  }

  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.changed.emit(this.value);
    }
  }

  public onBlur(event: FocusEvent) {
    this.focused = false;
    event.preventDefault();
    event.stopPropagation();
  }

  public onKeyUp(event: KeyboardEvent) {
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
  }

  public onFocus(event: FocusEvent) {
    this.focused = true;
    event.preventDefault();
    event.stopPropagation();
  }

}
