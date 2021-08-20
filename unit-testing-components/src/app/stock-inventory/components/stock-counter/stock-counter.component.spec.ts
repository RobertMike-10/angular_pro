import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { StockCounterComponent } from './stock-counter.component';


describe('StockCounterComponent', () => {
  let component: StockCounterComponent;
  let fixture: ComponentFixture<StockCounterComponent>;
  let element: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StockCounterComponent
      ]
    });
    fixture = TestBed.createComponent(StockCounterComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    component.value = 0;
  });

  //adds one
  it('should increment correctly', () => {
    component.increment()
    expect(component.value).toBe(1);
  });

  //add and substract
  it('should decrement correctly', () => {
    component.increment()
    expect(component.value).toBe(1);
    component.decrement()
    expect(component.value).toBe(0);
  });

  //not under 0
  it('should not decrement below the minimum value', () => {
    component.increment()
    expect(component.value).toBe(1);
    component.decrement()
    expect(component.value).toBe(0);
    component.decrement()
    expect(component.value).toBe(0);
  });

  //not over 100
  it('should not increment below the maximum value', () => {
    for (let i = 0; i < 300; i++) {
      component.increment();
    }
    expect(component.value).toBe(200);
  });

  it('should not increment over the maximum value with input', () => {
    component.step = 20;
    component.max = 20;
    component.increment();
    component.increment();
    expect(component.value).toBe(20);
  });

  it('should call the output on a value change', () => {
    spyOn(component.changed, 'emit').and.callThrough();
    component.step = 100;
    component.increment();
    expect(component.changed.emit).toHaveBeenCalledWith(100);
  });

  //user interaction

  it('should increment when the + button is clicked', () => {
    element.query(By.css('button:first-child')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.value).toBe(1);
    expect(element.query(By.css('p')).nativeElement.textContent).toBe('1');
  });

  //increment and then decrement
  it('should decrement when the - button is clicked', () => {
    element.query(By.css('button:first-child')).triggerEventHandler('click', null);
    fixture.detectChanges();
    element.query(By.css('button:nth-child(2)')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.value).toBe(0);
    expect(element.query(By.css('p')).nativeElement.textContent).toBe('0');
  });


  it('should increment the value when the up arrow is pressed', () => {
    const event = new Event('KeyboardEvent') as any;
    event.code = 'ArrowUp';
    element.query(By.css('.stock-counter > div > div')).triggerEventHandler('keydown', event);
    fixture.detectChanges();
    expect(component.value).toBe(1);
  });
   //increment and then decrement
  it('should decrement the value when the down arrow is pressed', () => {
    const event = new Event('KeyboardEvent') as any;
    event.code = 'ArrowUp';
    element.query(By.css('.stock-counter > div > div')).triggerEventHandler('keydown', event);
    fixture.detectChanges();
    event.code = 'ArrowDown';
    element.query(By.css('.stock-counter > div > div')).triggerEventHandler('keydown', event);
    fixture.detectChanges();
    expect(component.value).toBe(0);
  });


});
