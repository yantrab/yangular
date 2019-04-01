import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { fromEvent, BehaviorSubject } from 'rxjs';
import { GridTableDataSource } from './data-source';
import { MatSort } from '@angular/material';
import { ColumnDef as _columnsDef } from './table.interfaces';
import { orderBy, keyBy } from 'lodash';
import { PCellDef } from './PCellDef';

interface ColumnDef extends _columnsDef {
  template?;
}

@Component({
  selector: 'mat-virtual-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  pending: boolean;
  sticky = true;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ContentChildren(PCellDef) _CellDefs: QueryList<PCellDef>;
  filterChange = new BehaviorSubject('');
  dataSource: GridTableDataSource<any>;
  offset: number;
  private _columnsDef: ColumnDef[];
  @Input() set columnsDef(columns: ColumnDef[]) { this._columnsDef = columns; }
  get columnsDef() { return this._columnsDef; }
  @Input() rows: any[];
  @Input() isFilterable = true;
  @Input() filterPlaceholder = 'Filter';
  @Input() itemSize = 47;
  @Input() headerSize = 56;
  columns: string[];
  ngOnInit() {
    this.init();
    this.viewport.setTotalContentSize(this.rows.length);
    this.dataSource.allData = this.rows;
    if (!this.columnsDef) {
      this.columnsDef = Object.keys(this.rows[0]).map(key => { return { field: key, title: key } as ColumnDef; });
    }
    this.columns = this.columnsDef.map(c => c.field);
  }

  ngAfterViewInit(): void {
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
      fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(distinctUntilChanged(), debounceTime(150))
        .subscribe(() => {
          this.pending = true;
          setTimeout(() => {
            this.dataSource.allData =
              this.rows.filter(row => (row.query as string).indexOf(' ' + this.filter.nativeElement.value) !== -1);
            this.viewport.scrollToOffset(0);
            setTimeout(() => this.pending = false, 0);
          }, 200);
        });
    }

    this.matSort.sortChange.subscribe(() => {
      this.pending = true;
      setTimeout(() => {
        this.dataSource.allData = orderBy(this.rows, this.matSort.active, this.matSort.direction as any);
        this.viewport.scrollToOffset(0);
        setTimeout(() => this.pending = false, 0);
      }, 200);
    });

    setTimeout(() => {
      this._CellDefs.forEach(columnDef => {
        this.columnsDef.find(c => c.field === columnDef.columnName).template = columnDef.template;
      });
    }, 0);
  }

  private init() {
    if (this.dataSource) {
      return;
    }
    this.dataSource = new GridTableDataSource([], {
      viewport: this.viewport,
    });
  }


  start: any = undefined;
  pressed: boolean = false;
  startX: any;
  startWidth: any;


  resizeTable(event: any, column: any) {
    this.start = event.target;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = this.start.clientWidth;
    this.mouseMove(column);
  }


  resizableFnMousemove(event, column) {
    column.width = this.startWidth + (event.pageX - this.startX);
    let index = this.start.cellIndex;
  }

  mouseMove(column: any) {
    const moveFn = (event) => this.resizableFnMousemove(event, column);
    const upFn = (event) => {
      this.pressed = false;
      document.removeEventListener('mousemove', moveFn);
    };

    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);
  }

}
