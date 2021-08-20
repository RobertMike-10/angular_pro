import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StockInventoryService } from '../../services/stock.inventory.services';

@Injectable({ providedIn: 'root' })
export class MyBranchValidator implements AsyncValidator{
  constructor(private myService: StockInventoryService) {}
  //return ValidationErrors or null
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.myService.checkBranchId(control.value).pipe(
      map((response: boolean) => response ? null : { unknownBranch: true }),
      catchError(()=> of(null))
    );
  }
}
