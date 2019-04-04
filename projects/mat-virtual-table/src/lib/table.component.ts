import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ViewEncapsulation,
  ViewChildren
} from '@angular/core';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { fromEvent, BehaviorSubject } from 'rxjs';
import { GridTableDataSource } from './data-source';
import { MatSort, MatHeaderCell } from '@angular/material';
import { ColumnDef as _columnsDef } from './table.interfaces';
import { orderBy, keyBy } from 'lodash';
import { PCellDef } from './PCellDef';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
interface ColumnDef extends _columnsDef {
  template?;
  width?: string;
}

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(47, 1000, 2000);
  }
  attach(viewport: CdkVirtualScrollViewport): void {
    this.onDataLengthChanged();
  }
}


@Component({
  selector: 'mat-virtual-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [{ provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, AfterViewInit {
  pending: boolean;
  sticky = true;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChildren('headercell') headerCells: QueryList<ElementRef>;
  @ContentChildren(PCellDef) _CellDefs: QueryList<PCellDef>;
  filterChange = new BehaviorSubject('');
  dataSource: GridTableDataSource;
  offset: number;
  private _columnsDef: ColumnDef[];
  @Input() set columnsDef(columns: ColumnDef[]) {
    this._columnsDef = columns;
    this.columns = this.columnsDef.map(c => c.field);
  }
  get columnsDef() { return this._columnsDef; }

  private _rows: any[];
  @Input() set rows(rows: any[]) {
    if (!rows) { return; }
    this._rows = rows || [];
    if (!this.columnsDef) {
      this.columnsDef = Object.keys(this._rows[0]).map(key => { return { field: key, title: key } as ColumnDef; });
    }
    this.initDatasource();
  }
  get rows() { return this._rows || []; }
  @Input() isFilterable = true;
  @Input() filterPlaceholder = 'Filter';
  @Input() itemSize = 47;
  @Input() headerSize = 56;
  columns: string[];
  ngOnInit() {

  }

  initDatasource() {
    if (!this.dataSource) {
      this.dataSource = new GridTableDataSource(this.rows, this.viewport, this.itemSize);
    }
    this.dataSource.allData = this.rows;
    if (this.isFilterable || this.columnsDef.some(c => c.isFilterable)) {
      const filterables = this.columnsDef.filter(c => c.isFilterable);
      const defByKey = keyBy(this.columnsDef, c => c.field);
      for (const row of this.rows) {
        row.query = ' ';
        for (const key of Object.keys(row)) {
          if (!filterables.length || defByKey[key].isFilterable) {
            row.query += row[key] + ' ';
          }
        }
        row.query = row.query.toLowerCase();
      }
    }
  }
  ngAfterViewInit(): void {
    if (this.isFilterable || this.columnsDef.some(c => c.isFilterable)) {
      fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(distinctUntilChanged(), debounceTime(150))
        .subscribe(() => {
          this.pending = true;
          setTimeout(() => {
            this.dataSource.allData =
              this.rows.filter(row => (row.query as string).indexOf(' ' + this.filter.nativeElement.value) !== -1);
            setTimeout(() => this.pending = false, 0);
          }, 200);
        });
    }

    this.matSort.sortChange.subscribe(() => {
      this.pending = true;
      setTimeout(() => {
        this.dataSource.allData = orderBy(this.rows, this.matSort.active, this.matSort.direction as any);
        setTimeout(() => this.pending = false, 0);
      }, 200);
    });

    setTimeout(() => {
      this._CellDefs.forEach(columnDef => {
        this.columnsDef.find(c => c.field === columnDef.columnName).template = columnDef.template;
      });
    }, 0);
  }

  resizeTable(i) {
    const cells = this.headerCells.toArray();
    const el = cells[i].nativeElement;
    const elNext = cells[i + 1] ? cells[i + 1].nativeElement : undefined;
    const startX = el.pageX;
    const moveFn = (ev: any) => {
      const offset = ev.pageX - startX;
      this.columnsDef[i].width = (el.clientWidth + offset) + 'px';
      if (elNext) {
        this.columnsDef[i + 1].width = (elNext.clientWidth - offset) + 'px';
      }
    };
    const upFn = () => {
      document.removeEventListener('mousemove', moveFn);
      document.removeEventListener('mouseup', upFn);
    };

    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);
  }

}
