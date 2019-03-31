import {
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatSortModule,
} from '@angular/material';
import { NgModule } from '@angular/core';

const modules = [
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatSortModule,
];
@NgModule({
  imports: modules,
  exports: modules,
  declarations: [],
})
export class MaterialModule { }
