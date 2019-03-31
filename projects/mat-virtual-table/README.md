# MatVirtualTable
Virtual scroll table base on angualr material, and [this](https://github.com/lujian98/Angular-Material-Virtual-Scroll) repo .

## Getting Started

### install
run `npm i mat-virtual-table`

### import module

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

### simple usage
```html
 <mat-virtual-table *ngIf="rows.length" [rows]="rows">
```

### column titles
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


