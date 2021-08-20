import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { Observable,of } from 'rxjs';
import { StockInventoryService } from './stock.inventory.services';


function createResponse(body:any):Observable<any> {
  return of(
    //new HttpResponse({body: JSON.stringify(body)})
    body
  );
}

class MockHttp {
  get() {
    return createResponse([]);
  }
}

const cartItems = [{ product_id: 1, quantity: 10 }, { product_id: 2, quantity: 5 }];
const productItems = [{ id: 1, price: 10, name: 'Test' }, { id: 2, price: 100, name: 'Another Test' }];

describe('StockInventoryService', () => {

  let service: StockInventoryService;
  let httpClient: HttpClient;


 describe('Serice test only result', () => {
  //inject mockHttp as Httplient
  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        StockInventoryService,
        { provide: HttpClient, useClass: MockHttp }
      ]
    });
    //injecting
    httpClient = bed.get(HttpClient);
    service = bed.get(StockInventoryService);
  });


  it('should get cart items async', async () => {
    // Act
    spyOn(httpClient, 'get').and.returnValue(createResponse([...cartItems]));
    const MyCartItems = await service.getCartItems().toPromise();
    // Assert

    expect(MyCartItems).toEqual(cartItems);

  });


  it('should get cart items', () => {
    spyOn(httpClient, 'get').and.returnValue(createResponse([...cartItems]));
    service.getCartItems()
      .subscribe((result) => {
        //console.log(result);
        expect(result.length).toBe(2);
        expect(result).toEqual(cartItems);
      });
  });

  it('should get product items', () => {
    spyOn(httpClient, 'get').and.returnValue(createResponse([...productItems]));
    service.getProducts()
      .subscribe((result) => {
        //console.log(result);
        expect(result.length).toBe(2);
        expect(result).toEqual(productItems);
      });
  });

});

});
