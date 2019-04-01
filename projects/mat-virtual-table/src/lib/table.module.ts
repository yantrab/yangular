import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GridTableVirtualScrollModule } from './virtual-scroll/virtual-scroll.module';
import { TableComponent } from './table.component';
import { PCellDef } from './PCellDef';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatSortModule
} from '@angular/material';
const components = [TableComponent, PCellDef];
const modules = [
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatSortModule
];
@NgModule({
  declarations: components,
  exports: [...components],
  imports: [
    CommonModule,
    GridTableVirtualScrollModule,
    ScrollingModule,
    modules,
    FlexLayoutModule
  ],
})
export class TableModule { }

