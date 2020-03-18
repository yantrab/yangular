# Virtual scroll angular material table
Virtual scroll table based on angular material, with sticky columns, filtering ,sorting and resizing columns.

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
 <mat-virtual-table [rows]="rows">
```

### Column titles 
```html
 <mat-virtual-table [rows]="rows" [columnsDef]="columns">
```
[example](https://stackblitz.com/edit/mat-virtual-table-basic-tupcj8?file=src%2Fapp%2Fapp.component.html)

### Special cells
```html
<mat-virtual-table [rows]="rows" [columnsDef]="columns">
    <ng-template pCellDef column="name" let-row="row">
        <b>{{row.name}}</b>
    </ng-template>
</mat-virtual-table>
```
[example](https://stackblitz.com/edit/mat-virtual-table-special-cells?file=src/app/app.component.html)

### Resizing columns
resize column with [rtl support](https://stackblitz.com/edit/mat-virtual-table-resize?file=src%2Findex.html).

### Pagination
Set paginator true to add paginator.
```typescript
<mat-virtual-table [rows]="rows" [paginator]="true">
</mat-virtual-table>
```

to custom lables, use ```CustomMatPaginatorIntl```:
```typescript
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  nextPageLabel = 'הבא';
  previousPageLabel = 'קודם';
  getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return '0 מתוך ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' מתוך ' + length;
  };
}
```
[example](https://stackblitz.com/edit/mat-virtual-table-paginator?file=src%2Fapp%2Fapp.module.ts).

### Api
```typescript
@Input() rows; // table rows.
@Input() columnsDef; // columns definitions. each column it could be define title, isSortable, isFilterable, and width. default width is calculated by max value length.
@Input() isFilterable = true; // true by default, and filter all columns, Unless otherwise specified in the columnsDef.
@Input() filterPlaceholder = 'Filter';  
@Input() isResizable = true; // true by default, rtl support. be aware that there is performace issue without build with production mode.
@Input() itemSize = 47;
@Input() headerSize = 56;
@Input() pageSize = 50;
@Input() paginator: boolean;
@Input() isDisplayingRowsEmptyMessage = false; // false by default, support a centered message when there is no row.
@Input() rowsEmptyMessage = 'No records found.';
```


