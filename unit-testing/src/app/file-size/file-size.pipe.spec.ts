import { FileSizePipe } from './file-size.pipe';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Component } from '@angular/core';

describe('FileSizePipe', () => {

  /*beforeAll( ()=> {
    //virtual environtment
    TestBed.initTestEnvironment(
       BrowserDynamicTestingModule,
       platformBrowserDynamicTesting()
     );
   });*/

  describe('Shallow FileSizePipe test', () => {

    //virtual component
    @Component({
      template: `
        Size: {{ size | filesize:suffix }}
      `
    })
    class TestComponent {
      suffix!:string;
      size = 123456789;
    }
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let element: HTMLElement;
    //configure Module
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          FileSizePipe,
          TestComponent
        ]
      });
      //create component
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
    //end Before

    it('should convert bytes to megabytes', () => {
      fixture.detectChanges();
      //with initla value
      expect(element.textContent).toContain('Size: 117.74MB');
      //change value
      component.size = 1029281;
      //detect changes
      fixture.detectChanges();
      expect(element.textContent).toContain('Size: 0.98MB');
    });
    it('should use the default extension when not supplied', () => {
      fixture.detectChanges();
      expect(element.textContent).toContain('Size: 117.74MB');
    });
    it('should override the extension when supplied', () => {
      component.suffix = ' Mega Bytes';
      fixture.detectChanges();
      expect(element.textContent).toContain('Size: 117.74 Mega Bytes');
    });
  });


  describe('Isolate FileSizePipe test', () => {
    const pipe = new FileSizePipe();
    it('should convert bytes to megabytes', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
      expect(pipe.transform(987654321)).toBe('941.90MB');
    });

    it('should use the default extension when not supplied', () => {
      expect(pipe.transform(123456789)).toBe('117.74MB');
      expect(pipe.transform(987654321)).toBe('941.90MB');
    });

    it('should override the extension when supplied', () => {
      expect(pipe.transform(123456789, ' Mega Bytes')).toBe('117.74 Mega Bytes');
      expect(pipe.transform(987654321, ' MBytes')).toBe('941.90 MBytes');
    });
  });

});
