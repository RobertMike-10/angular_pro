import { Component } from '@angular/core';


@Component({
  selector: 'mail-app',
  styleUrls: ['mail-app.component.scss'],
  template: `
    <div class="mail">
      <router-outlet
      (activate)="onActivate($event)"
      (deactivate)="onDeActivate($event)">
      </router-outlet>
    </div>
    <div class="mail">
      <router-outlet name="pane"></router-outlet>
    </div>
  `
})
export class MailAppComponent {

  onActivate(event:Event){
   //console.log('Activate:' + event);
  }

  onDeActivate(event:Event){
    //console.log('Deactivate:' +event);
   }

}
