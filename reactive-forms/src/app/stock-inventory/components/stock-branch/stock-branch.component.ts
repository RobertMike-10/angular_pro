import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'stock-branch',
  styleUrls: ['stock-branch.component.css'],
  template: `
      <div [formGroup] = "parent">
      <div formGroupName="store">
        <input type="text" placeholder="Branch ID"
        formControlName="branch">
        <div class="error"
        *ngIf="required('branch')">
          BranchID is required
        </div>
        <div class="error"
        *ngIf="invalid">
          Invalid Branch code, required 1 letter, 3 numbers
        </div>
        <div class="error"
        *ngIf="unknown">
          Invalid Branch code, Unknown branch
        </div>
        <input type="text" placeholder="Manager Code"
        formControlName="code">
        <div class="error"
        *ngIf="required('code')">
          Code is required
        </div>
      </div>
      </div>
  `})

export class StockBranchComponent {
 @Input()
 parent!: FormGroup;

 required(control:string):boolean{
  return this.parent.get(`store.${control}`)!.hasError('required') &&
  this.parent.get(`store.${control}`)!.touched ;
 }

 get invalid(){
  return this.parent.get('store.branch')!.hasError('invalidBranch') &&
  this.parent.get('store.branch')!.dirty &&
  !this.required('branch');

 }

 get unknown(){
  return this.parent.get('store.branch')!.hasError('unknownBranch') &&
  this.parent.get('store.branch')!.dirty &&
  !this.required('branch');
 }



}
