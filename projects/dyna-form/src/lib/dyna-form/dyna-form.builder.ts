import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynaValidator } from './dyna.validator';
import { MetadataStorage } from 'class-validator/metadata/MetadataStorage';
import { getFromContainer } from 'class-validator/container';
import { uniq } from 'lodash';
// @dynamic
@Injectable()
export class DynaFormBuilder {
    constructor(public fb: FormBuilder) {}
    private metadataStorage = getFromContainer(MetadataStorage);

    public async buildFormFromClass(classConstructor: new (model) => any): Promise<FormGroup> {
        const formControls = {};
        const formFieldList: any = [];
        const props = uniq(
            this.metadataStorage
                .getTargetValidationMetadatas(new classConstructor({}).constructor, classConstructor.name)
                .map(t => t.propertyName),
        );
        props.forEach(key => {
            formControls[key] = new FormControl(null, DynaValidator.validateControl(classConstructor));
            formFieldList.push(key);
        });

        const formInstance = this.fb.group(formControls);
        // tslint:disable-next-line: no-string-literal
        formInstance['formFields'] = formFieldList;

        return formInstance;
    }
}

export const validateAllFields = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFields(control);
        }
    });
};
