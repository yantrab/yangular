import { NgModule } from '@angular/core';
import { TextBoxComponent } from './text-box/text-box.component';
import { DynaFormBuilder } from './dyna-form/dyna-form.builder';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
@NgModule({
    declarations: [TextBoxComponent, FormComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
    ],
    providers: [DynaFormBuilder],
    exports: [TextBoxComponent, FormComponent],
    entryComponents: [FormComponent],
})
export class DynaFormModule {}
