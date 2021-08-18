import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ul>
        <li *myFor="let item of items; let i = index;">
          {{ i }} Member: {{ item.name | json }}
        </li>
        <ng-template myFor [myForOf]="items" let-item let-i="index">
          <li>
            {{ i }} Member: {{ item.name | json }}
          </li>
        </ng-template>
      </ul>
    </div>
  `
})
export class AppComponent {
  items = [{
    name: 'Roberto García',
    age: 35,
    location: 'California'
  },{
    name: 'Beatriz Martínez',
    age: 24,
    location: 'New York'
  },{
    name: 'Esmeralda Ramírez',
    age: 48,
    location: 'Chicago'
  }];
  constructor() {
    setTimeout(() => {
      this.items = [...this.items, { name: 'Matt Skiba', age: 40, location: 'California' }];
    }, 2000);
  }
}
