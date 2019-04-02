import { DataSource, ListRange } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

export class GridTableDataSource extends DataSource<any> {
  private _data: any[];
  get allData(): any[] {
    return this._data.slice();
  }
  set allData(data: any[]) {
    this._data = data;
    this.viewport.scrollToIndex(0);
    this.visibleData.next(this._data.slice(0, 30));
  }

  constructor(initialData: any[], private viewport: CdkVirtualScrollViewport) {
    super();
    this._data = initialData;
    this.viewport.elementScrolled().subscribe((ev: any) => {
      const start = Math.floor(ev.currentTarget.scrollTop / 47);
      const slicedData = this._data.slice(start, start + 30);
      this.viewport.setRenderedContentOffset(47 * start);
      this.visibleData.next(slicedData);
    });
  }
  private readonly visibleData: BehaviorSubject<any[]> = new BehaviorSubject([]);

  connect(collectionViewer: import('@angular/cdk/collections').CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
    return this.visibleData;
  }
  disconnect(collectionViewer: import('@angular/cdk/collections').CollectionViewer): void {
  }
}
