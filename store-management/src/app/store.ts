import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {pluck} from 'rxjs/operators';
import {distinctUntilChanged } from 'rxjs/operators';

import { State } from './state';

const state: State = {
  playlist: []
};

export class Store {

  //initial value of store
  private subject = new BehaviorSubject<State>(state);
  //observable, only emits when change
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    //update the value
    this.subject.next({
      ...this.value, [name]: state
    });
  }

}
