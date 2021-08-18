import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div>
      <button (click)="addProp()">Add property</button>
      <button (click)="changeUser()">Change user object</button>
      <button (click)="changeName()">Change name property</button>
      <div class="users">
        <example-one [user]="user"></example-one>
        <example-two [user]="user"></example-two>
      </div>
    </div>
  `
})
export class AppComponent {
  user: any = {
    name: 'Esmeralda Ramirez',
    age: 48,
    location: 'Saltillo'
  };

  addProp() {
    this.user.email = 'esme@blink-182.net';
  }

  changeName() {
    this.user.name = 'Zabdiel García';
  }

  changeUser() {
    this.user = {
      name: 'Bethi Martínez',
      age: 24,
      location: 'Saltillo'
    };
  }
}
