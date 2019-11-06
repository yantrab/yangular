import { NgModule } from '@angular/core';
import { TextBoxComponent } from './text-box/text-box.component';
import { DynaFormBuilder } from './dyna-form/dyna-form.builder';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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
        FlexLayoutModule,
    ],
    providers: [DynaFormBuilder],
    exports: [TextBoxComponent, FormComponent],
    entryComponents: [FormComponent],
})
export class DynaFormModule {}
