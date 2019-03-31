import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from './table.module';
import { TableComponent } from './table.component';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  template: `<mat-virtual-table style="height:500px;" [rows]="rows"></mat-virtual-table>`,
  styles: ['cdk-virtual-scroll-viewport{height:500px;}']
})
export class Host1Component {
  rows = Array(100000).fill({ name: 'name', id: 'id' });
}


describe('TableComponent', () => {
  let component: Host1Component;
  let fixture: ComponentFixture<Host1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Host1Component],
      imports: [TableModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Host1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
