import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ViewContainerRef, ViewChild, AfterContentInit, ComponentFactoryResolver, ComponentRef, TemplateRef } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>

      <button (click)="destroyComponent()">
        Destroy
      </button>
      <button (click)="moveComponent()">
        Move
      </button>
      <div #entry></div>
      <ng-container
       [ngTemplateOutlet] ="templ"
       [ngTemplateOutletContext] ="ctx">

      </ng-container>
      <ng-template #templ let-name let-location="location">
        {{name}}: {{location}}
      </ng-template>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  @ViewChild('entry', { read: ViewContainerRef,static: true }) entry!: ViewContainerRef;
  component!: ComponentRef<AuthFormComponent>;
  @ViewChild('templ',{static: true }) templ!: TemplateRef<any>;
  ctx ={
    $implicit: "Miguel García",
    location :"Coahuila, México"
  }
  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterContentInit() {
    //create the component
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    //inject in the template
    const component = this.entry.createComponent(authFormFactory);
    this.component = this.entry.createComponent(authFormFactory,0);
    this.component.instance.title="Create Account";
    //subscribing local method to the output event
    this.component.instance.submitted.subscribe(this.loginUser);

    //templates
    this.entry.createEmbeddedView(this.templ,{
      $implicit: "Roberto Miguel García",
      location :"Coahuila, México"
    });

  }

  destroyComponent(){
    this.component.destroy();
  }

  moveComponent(){
    this.entry.move(this.component.hostView,1);
  }
  loginUser(user: User) {
    console.log('Login', user);
  }

}
