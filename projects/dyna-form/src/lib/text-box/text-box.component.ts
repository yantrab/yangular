import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from './MyErrorStateMatcher';

@Component({
    selector: 'p-text-box',
    template: `
        <form  [formGroup]="form.parent">
            <mat-form-field [appearance]="appearance">
                <input
                    [type]="type === 'password' ? (hide ? 'password' : 'text') : type"
                    matInput
                    [placeholder]="placeholder"
                    [formControl]="form"
                    [name]="name"
                    [formControlName]="name"
                    [errorStateMatcher]="matcher"
                />
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
                <mat-error *ngIf="form.invalid"> {{ matcher.error }} </mat-error>
            </mat-form-field>
        </form>
    `,
    styles: ['mat-form-field{width: 100%;}'],
})
export class TextBoxComponent {
  @Input() form: FormControl = new FormControl();
  @Input() name: string;
  @Input() placeholder = '';
  @Input() hint;
  @Input() type = 'text';
  @Input() appearance = 'outline';
  hide = true;

  matcher = new MyErrorStateMatcher();
}
