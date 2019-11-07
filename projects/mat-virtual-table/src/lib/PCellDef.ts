import { Input, Directive, TemplateRef } from '@angular/core';
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[pCellDef]' })
// tslint:disable-next-line:directive-class-suffix
export class PCellDef {
  constructor(public template: TemplateRef<any>) { }
  /** Unique name for this column. */
  @Input('column')
  get columnName(): string { return this._columnName; }
  set columnName(name: string) {
    this._columnName = name;
  }
  private _columnName: string;
}
