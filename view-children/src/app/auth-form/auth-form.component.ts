import { Component, Renderer2, Output, ViewChild, ViewChildren,AfterViewInit, EventEmitter, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef, ElementRef } from '@angular/core';

import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

import { User } from './auth-form.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'auth-form',
  styles:[`
    .email{border-color:#9f72e6;}
  `],
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" id="email" ngModel #email>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message
          [style.display]="(showMessage ? 'inherit' : 'none')">
        </auth-message>
        <auth-message
          [style.display]="(showMessage ? 'inherit' : 'none')">
        </auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  showMessage!: boolean;

  @ViewChild('email',{static: true}) email!: ElementRef;

  @ViewChildren(AuthMessageComponent) message!: QueryList<AuthMessageComponent>;

  @ContentChildren(AuthRememberComponent) remember!: QueryList<AuthRememberComponent>;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2)
  {

  }
  ngAfterViewInit() {
    // this.message.days = 30;
    //native modifications like jquery

    //this.email.nativeElement.setAttribute('placeholder','Enter your Email');
    //this.email.nativeElement.classList.add('email');
    this.email.nativeElement.focus();

    this.renderer.setAttribute(this.email.nativeElement,'placeholder','Enter your Email');
    this.renderer.addClass(this.email.nativeElement,'email');
    this.renderer.selectRootElement('#email').focus();
    if (this.message) {
      this.message.forEach((message) => {
        message.days =30;
    });
    this.cd.detectChanges();
  }

  }

  ngAfterContentInit() {
    //Change thge property in the child
    console.log("Init");
    console.log(this.message);
    //if (this.message) {
     // this.message.days = 30;
     // console.log(this.message.days );
    //}
    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked);
      });
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
