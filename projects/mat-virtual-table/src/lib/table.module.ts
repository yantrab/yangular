import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableComponent } from './table.component';
import { PCellDef } from './PCellDef';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';


const components = [TableComponent, PCellDef];
const modules = [
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatSortModule,
  MatPaginatorModule
];
@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    ScrollingModule,
    modules,
    FlexLayoutModule
  ],
})
export class TableModule { }

