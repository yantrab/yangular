import { Component, Inject, Input, Optional, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { DynaFormBuilder, validateAllFields } from '../dyna-form/dyna-form.builder';

export interface FormModel<T> {
    modelConstructor: new (model: T) => any;
    model?: Partial<T>;
    feilds: Array<{
        key: keyof T;
        placeHolder?: string;
        appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
        hint?: string;
        type?: string;
        isTextera?: boolean;
    }>;
    appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
    errorTranslations?: {};
    formTitle?: string;
    formSaveButtonTitle?: string;
    formCancelButtonTitle?: string;
}

@Component({
    selector: 'p-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
    form: FormGroup;
    @Input() formModel: FormModel<any>;
    @Output() submit = new EventEmitter();
    constructor(
        @Optional() public dialogRef: MatDialogRef<FormComponent>,
        private dynaFB: DynaFormBuilder,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: FormModel<any>,
    ) {
        if (data) {
            this.formModel = data;
            this.dynaFB
                .buildFormFromClass(this.formModel.modelConstructor, this.formModel.model)
                .then(form => (this.form = form));
        }
    }
    ngOnInit(): void {
        if (!this.formModel.errorTranslations) {
            this.formModel.errorTranslations = {};
        }

        if (!this.form) {
            this.dynaFB
                .buildFormFromClass(this.formModel.modelConstructor, this.formModel.model)
                .then(form => (this.form = form));
        }
    }

    save(e) {
        // On case that there is no changes in form
        validateAllFields(this.form);
        if (this.form.valid) {
            for (const key in this.form.value) {
                if (this.form.value[key] == null) {
                    delete this.form.value[key];
                }
            }
            if (this.dialogRef) {
                this.dialogRef.close(this.form.value);
            } else {
                this.submit.emit(this.form.value);
            }
        }
        e.preventDefault();
    }
    cancel() {
        this.dialogRef.close();
    }
}
