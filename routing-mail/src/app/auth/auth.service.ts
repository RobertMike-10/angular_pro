import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';


@Injectable()
export class AuthService {
  user = { isAdmin: true };
  //always is admin
  checkPermissions():Observable<boolean> {
    return of(this.user.isAdmin);
  }
  //always is logged
  isLoggedIn():Observable<boolean> {
    return of(true);
  }
}
