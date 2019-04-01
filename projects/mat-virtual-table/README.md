# MatVirtualTable
Virtual scroll table based on angualr material, and [this](https://github.com/lujian98/Angular-Material-Virtual-Scroll) repo . [DEMO](https://stackblitz.com/edit/mat-virtual-table-basic?file=src/app/app.component.ts)

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
 <mat-virtual-table *ngIf="rows" [rows]="rows">
```

### Column titles 
```html
 <mat-virtual-table *ngIf="rows" [rows]="rows" [columnsDef]="columns">
```
[example](https://stackblitz.com/edit/mat-virtual-table-basic-tupcj8?file=src%2Fapp%2Fapp.component.html)

### Special cells
```html
<mat-virtual-table *ngIf="rows" [rows]="rows" [columnsDef]="columns">
    <ng-template pCellDef column="name" let-row="row">
        <b>{{name}}</b>
    </ng-template>
</mat-virtual-table>
```
[example](https://stackblitz.com/edit/mat-virtual-table-special-cells?file=src/app/app.component.html)


