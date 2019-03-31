# MatVirtualTable
Virtual scroll table base on angualr material, and [this](https://github.com/lujian98/Angular-Material-Virtual-Scroll) repo .

## Getting Started

### Install
run `npm i mat-virtual-table`

### Import module

```typescript
import {TableModule} from 'mat-virtual-table';
@NgModule({
    imports: [
            FormsModule,
            ReactiveFormsModule,
            MaterialModule,
            CommonModule,
            FlexLayoutModule,
            RouterModule,
            TableModule,
    ],
    declarations: components,
    exports: [TableModule, MaterialModule, FlexLayoutModule].concat(components),
})
export class ComponentsModule { }
```

### Simple usage
```html
 <mat-virtual-table *ngIf="rows.length" [rows]="rows">
```

### Column titles
```html
 <mat-virtual-table *ngIf="rows.length" [rows]="rows" [columnsDef]="columns">
```

### Special cells
```html
<mat-virtual-table *ngIf="rows.length" [rows]="rows" [columnsDef]="columns">
    <ng-template pCellDef column="hebName" let-row="row">
        <b>{{row.hebName}}</b>
    </ng-template>
</mat-virtual-table>
```


