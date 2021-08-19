import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes, PreloadingStrategy, Route} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MailModule } from './mail/mail.module';

import { AppComponent } from './app.component';
import { Observable,of  } from 'rxjs';

import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

//invokes only the routes with the data.preload
export class CustomPreload implements PreloadingStrategy{
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
   return route.data && route.data.preload ?fn(): of(null);
  }
}
export const ROUTES: Routes = [
  { path: '**', redirectTo: 'folder/inbox' },
  //after the # put the module name
  { path: 'dashboard',
    canLoad:[AuthGuard],
    data:{preload:true},
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MailModule,
    AuthModule,
    RouterModule.forRoot(ROUTES, { enableTracing: false, preloadingStrategy:CustomPreload })
  ],
  bootstrap: [
    AppComponent
  ],
  providers:[
    CustomPreload
  ]
})
export class AppModule {}
