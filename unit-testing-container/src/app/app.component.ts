import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    {{title}}
    <div>
      <stock-inventory></stock-inventory>
    </div>
  `
})
export class AppComponent {
  title="unit-testing-container"
}
