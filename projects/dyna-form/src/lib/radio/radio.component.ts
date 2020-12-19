import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../text-box/MyErrorStateMatcher';

@Component({
  selector: 'p-radio',
  template: `
    <div style="display: flex; flex-direction: column;">
            <mat-label style="margin-left: 10px; margin-right: 10px" *ngIf="placeholder">{{ placeholder }}</mat-label>
            <mat-radio-group [formControl]="formControl"  style="margin: 15px 0;">
              <mat-radio-button *ngFor="let option of options" [value]="option.value" style="margin: 5px;">
                {{option.title}}
              </mat-radio-button>
            </mat-radio-group>
      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>
      <mat-error *ngIf="formControl.invalid"> {{ formControl.errors[0] }} </mat-error>
    </div>
    `,
  styles: [':host{width: 100%;}'],
})
export class RadioComponent {
  @Input() formControl: FormControl;
  @Input() placeholder = '';
  @Input() hint;
  @Input() errorTranslations = {};
  @Input() options: {title:string, value: any}[]
  matcher = new MyErrorStateMatcher();
}
