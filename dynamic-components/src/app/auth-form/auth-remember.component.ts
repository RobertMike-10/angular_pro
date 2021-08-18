import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'auth-remember',
  template: `
    <label>
      <input type="checkbox" [ngModel]="checkValue" (ngModelChange)="onChecked($event)"> >
      Keep me logged in
    </label>
  `
})
export class AuthRememberComponent {

  checkValue:boolean=false;
  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChecked(value: boolean) {
    this.checked.emit(value);
  }

}
