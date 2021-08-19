import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { IMail } from '../models/mail.interface';

const STOCK_API:string='http://localhost:3000';

@Injectable()
export class MailService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getFolder(folder: string): Observable<IMail[]> {
    return this.httpClient
      .get<IMail[]>(`${STOCK_API}?folder=${folder}`);
  }

  getMail(id: string): Observable<IMail> {
    return this.httpClient
      .get<IMail>(`${STOCK_API}/${id}`);
  }
}
