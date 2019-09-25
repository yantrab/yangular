import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from './MyErrorStateMatcher';

@Component({
    selector: 'p-text-box',
    template: `
        <mat-form-field [appearance]="appearance">
            <mat-label *ngIf="placeholder">{{ placeholder }}</mat-label>
            <input
                *ngIf="!isTextarea"
                matInput
                [formControl]="formControl"
                [type]="type === 'password' ? (hide ? 'password' : 'text') : type"
                [errorStateMatcher]="matcher"
            />
            <textarea
                *ngIf="isTextarea"
                matInput
                [formControl]="formControl"
                [type]="type === 'password' ? (hide ? 'password' : 'text') : type"
                [errorStateMatcher]="matcher"
            ></textarea>
            <button
                *ngIf="type === 'password'"
                mat-icon-button
                matSuffix
                (click)="hide = !hide"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hide"
            >
                <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
            <mat-error *ngIf="formControl.invalid"> {{ errorTranslations[matcher.error] || matcher.error }} </mat-error>
        </mat-form-field>
    `,
    styles: ['mat-form-field{width: 100%;}'],
})
export class TextBoxComponent {
    @Input() formControl: FormControl;
    @Input() placeholder = '';
    @Input() hint;
    @Input() type = 'text';
    @Input() appearance = 'outline';
    @Input() errorTranslations = {};
    @Input() isTextarea: boolean;

    hide = true;

    matcher = new MyErrorStateMatcher();
}
