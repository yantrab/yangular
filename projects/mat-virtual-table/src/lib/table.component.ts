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
import { MatSort } from '@angular/material';
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
  @Input() set columnsDef(columns: ColumnDef[]) {
    this._columnsDef = columns;
    this.columns = this.columnsDef.map(c => c.field);
  }
  get columnsDef() { return this._columnsDef; }
  @Input() set rows(rows: any[]) {
    if (!rows) { return; }
    this._rows = rows || [];
    if (!this.columnsDef) {
      this.columnsDef = Object.keys(this._rows[0]).map(key => { return { field: key, title: key } as ColumnDef; });
    }
    this.initDatasource();
  }
  get rows() { return this._rows || []; }
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

  private _rows: any[];
  @Input() isFilterable = true;
  @Input() filterPlaceholder = 'Filter';
  @Input() itemSize = 47;
  @Input() headerSize = 56;
  columns: string[];

  isResizeActive = false;
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
  private getTargetX(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    return e.clientX - rect.left;
  }
  resizeTable(event, i) {
    if (!this.isResizeActive) { return; }
    const cells = this.headerCells.toArray();
    const el = cells[i].nativeElement;
    const elStartWidth = el.clientWidth;
    const startTargetX = this.getTargetX(event);
    let op = 1;

    const startX = event.pageX;
    let elNextIndex;
    if (startTargetX > 20) {
      if (!cells[i + 1]) { return; }
      elNextIndex = i + 1;
    } else {
      if (!cells[i - 1]) { return; }
      elNextIndex = i - 1;
      op = -1;
    }
    const elNextStartWidth = cells[elNextIndex].nativeElement.clientWidth;
    const moveFn = (ev: any) => {
      const currentX = ev.pageX;
      const offset = (currentX - startX);

      if (elNextStartWidth - (offset * op) <= 0 || (elStartWidth + (offset * op)) <= 0) { return; }
      this.columnsDef[i].width = (elStartWidth + (offset * op)) + 'px';
      this.columnsDef[elNextIndex].width = (elNextStartWidth - (offset * op)) + 'px';
    };
    const upFn = () => {
      document.removeEventListener('mousemove', moveFn);
      document.removeEventListener('mouseup', upFn);
    };

    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);
  }

  mousemove(ev) {
    ev.target.style.cursor = 'pointer';

    if (ev.target.tagName === 'BUTTON') { return; }
    const el = ev.currentTarget.children[0];
    const elStartWidth = el.clientWidth;
    const startTargetX = this.getTargetX(ev);
    //el.style.cursor = 'pointer';
    if (elStartWidth - startTargetX < 3 || startTargetX < 3) {
      ev.target.style.cursor = 'col-resize';
      this.isResizeActive = true;
    } else {
      ev.target.style.cursor = 'pointer';
      this.isResizeActive = false;
    }
  }
}
