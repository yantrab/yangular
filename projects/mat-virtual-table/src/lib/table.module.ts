import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './table/table.component';
import { PCellDef } from './PCellDef';
@NgModule({
    declarations: [TableComponent, PCellDef],
    exports: [TableComponent, PCellDef],
    imports: [
        CommonModule,
        ScrollingModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatSortModule,
        MatPaginatorModule,
        FlexLayoutModule,
    ],
})
export class TableModule {}
