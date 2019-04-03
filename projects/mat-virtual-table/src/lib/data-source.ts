import { DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';
const PAGESIZE = 50;



export class GridTableDataSource extends DataSource<any> {
  private _data: any[];
  get allData(): any[] {
    return this._data.slice();
  }
  set allData(data: any[]) {
    this._data = data;
    this.viewport.scrollToOffset(0);
    this.viewport.setTotalContentSize(this.itemSize * data.length);

    this.visibleData.next(this._data.slice(0, PAGESIZE));
  }

  offset = 0;
  constructor(initialData: any[], private viewport: CdkVirtualScrollViewport, private itemSize: number) {
    super();
    this._data = initialData;
    this.viewport.elementScrolled().subscribe((ev: any) => {
      const start = Math.floor(ev.currentTarget.scrollTop / 47);
      const prevExtraData = start > (PAGESIZE / 2) ? (PAGESIZE / 2) : start;
      const slicedData = this._data.slice(start - prevExtraData, start + (PAGESIZE - prevExtraData));
      this.offset = 47 * (start - prevExtraData);
      this.viewport.setRenderedContentOffset(this.offset);
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