import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Directive,
  TemplateRef,
  ContentChildren,
  QueryList,
  SimpleChanges
} from '@angular/core';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridTableDataSource } from './virtual-scroll/data-source';
import { MatSort } from '@angular/material';
import { ColumnDef } from './table.interfaces';
import { orderBy } from 'lodash';

@Directive({ selector: '[pCellDef]' })
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
@Component({
  selector: 'mat-virtual-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  pending: boolean;
  sticky = false;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  sort: MatSort;
  @ViewChild(MatSort) set matSort(matSort: MatSort) {
    this.sort = matSort;
    this.sort.sortChange.subscribe(() => {
      this.dataSource.allData = orderBy(this.rows, this.sort.active, this.sort.direction as any);
      this.viewport.scrollToOffset(0);
    });
  }

  filter: ElementRef;
  @ViewChild('filter') set filterRef(filterRef: ElementRef) {
    this.filter = filterRef;
    if (this.isFilterable) {
      fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(distinctUntilChanged(), debounceTime(150))
        .subscribe(() => {
          this.pending = true;
          this.dataSource.allData =
            this.rows.filter(row => Object.keys(row).
              some(key => typeof (row[key]) === 'string'
                && (row[key] as string).startsWith(this.filter.nativeElement.value)));
          this.viewport.scrollToOffset(0);
          this.pending = false;
        });
    }
  }
  @ContentChildren(PCellDef) _CellDefs: QueryList<PCellDef>;
  filterChange = new BehaviorSubject('');
  dataSource: GridTableDataSource<any>;
  offset: Observable<number>;
  @Input() columnsDef: ColumnDef[];
  @Input() rows: any[];
  @Input() isFilterable = true;
  columns: string[];
  page = 1;
  pageSize = 80;

  constructor() {
  }

  ngOnInit() {
    this.init();
    this.dataSource.allData = this.rows.slice(0, this.pageSize);
    if (!this.columnsDef) {
      this.columnsDef = Object.keys(this.rows[0]).map(key => { return { field: key, title: key } as ColumnDef })
    }
    this.columns = this.columnsDef.map(c => c.field);
  }
  private init() {
    if (this.dataSource) {
      return;
    }
    this.dataSource = new GridTableDataSource([], {
      viewport: this.viewport,
    });
    this.offset = this.viewport.renderedRangeStream.pipe(
      map(() => -this.viewport.getOffsetToRenderedContentStart())
    );
  }
  nextBatch(event) {
    if (!this.sticky) { this.sticky = true; }
    const buffer = 20;
    const range = this.viewport.getRenderedRange();
    const end = range.end;
    if (this.dataSource.allData && this.dataSource.allData.length > 0) {
      if (end + buffer > this.page * this.pageSize) {
        this.page++;
        this.pending = true;
        setTimeout(() => {
          this.dataSource.allData = this.rows.slice(0, this.page * this.pageSize);
          this.pending = false;
        }, 250);
      }
    }
  }
}
