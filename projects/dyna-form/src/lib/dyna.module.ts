import { NgModule } from '@angular/core';
import { TextBoxComponent } from './text-box/text-box.component';
import { DynaFormBuilder } from './dyna-form/dyna-form.builder';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatFormFieldModule, MatIconModule,MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [TextBoxComponent],
  imports: [FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule, MatIconModule,MatButtonModule
  ],
    providers: [DynaFormBuilder],
    exports: [TextBoxComponent]
})
export class DynaFormModule { }
