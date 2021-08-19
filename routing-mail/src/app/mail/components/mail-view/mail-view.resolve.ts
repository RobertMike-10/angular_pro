import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { MailService } from '../../services/mail.services';
import { IMail } from '../../models/mail.interface';

@Injectable()
export class MailViewResolve implements Resolve<IMail> {
  constructor(private mailService: MailService) {}
  //inject the data from service
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.mailService.getMail(route.params.id);
  }
}
