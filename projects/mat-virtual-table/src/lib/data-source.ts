import { DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';

export class GridTableDataSource extends DataSource<any> {
  private data: any[];
  get allData(): any[] {
    return this.data.slice();
  }
  set allData(data: any[]) {
    this.data = data;
    this.viewport.scrollToOffset(0);
    this.viewport.setTotalContentSize(this.itemSize * data.length);

    this.visibleData.next(this.data.slice(0, this.pageSize));
  }
  pageIndex = 0;
  offset = 0;
  constructor(initialData: any[],
              private viewport: CdkVirtualScrollViewport,
              private itemSize: number,
              private pageSize: number,
              ) {
    super();
    this.data = initialData;
    this.viewport.elementScrolled().subscribe(async(ev: any) => {
      const start = Math.floor(ev.currentTarget.scrollTop / this.itemSize);
      const prevExtraData = start > (this.pageSize / 2) ? (this.pageSize / 2) : start;
      const slicedData = this.data.slice(start - prevExtraData, start + (this.pageSize - prevExtraData));
      this.offset = this.itemSize * (start - prevExtraData);
      this.viewport.setRenderedContentOffset(this.offset);
      this.pageIndex =  Math.floor(start / this.pageSize);
      this.visibleData.next(slicedData);
    });
  }
  readonly visibleData: BehaviorSubject<any[]> = new BehaviorSubject([]);

  connect(collectionViewer: import ('@angular/cdk/collections').CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
    return this.visibleData;
  }
  disconnect(collectionViewer: import ('@angular/cdk/collections').CollectionViewer): void {
  }
}
