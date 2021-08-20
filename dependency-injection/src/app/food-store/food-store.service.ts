import { Inject, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

//import 'rxjs/add/operator/map';

import { FOOD_STORE_CONFIG, FoodStoreConfig } from './config';
import { IStore } from '../food-store-model';
import { Observable } from 'rxjs';


@Injectable()
export class FoodStoreService {
  constructor(
    private http: HttpClient,
    @Inject(FOOD_STORE_CONFIG) private config: FoodStoreConfig
  ) {}

  getStore():Observable<IStore> {
    /* const headers = new Headers({
      id: this.config.storeId,
      token: this.config.storeToken
    });*/
    return this.http.get<IStore>(`http://localhost:3000/api/stores`, {headers:{
      "id": this.config.storeId.toString(),
      "token": this.config.storeToken
    }});

  }
}
