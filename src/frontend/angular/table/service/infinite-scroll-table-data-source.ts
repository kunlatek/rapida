import { MainInterface } from "../../../../interfaces/main";
import { FileType } from "../../core/file-type";
import { writeToFile } from "../../core/write-to-file";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setTableInfiniteScrollService = ({ table, projectPath }: MainInterface): string => {
  if (!table || !table.infiniteScroll) {
    console.info("Only tables infinite scroll set here");
    return ` `;
  }

  const code = `
  import { ListRange } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest, from, Observable, Subscription, of } from 'rxjs';
import {
  exhaustMap,
  filter,
  map, startWith,
  switchMap
} from 'rxjs/operators';
@Injectable()
export class InfiniteScrollTableDataSource extends DataSource<any> {
  private _pageSize = 50; // elements
  pages = 10; // pages
  private _pageOffset = 50; // elements
  private _pageCache = new Set<number>();
  private _subscription!: Subscription;
  private _viewPort!: CdkVirtualScrollViewport;

  // Create MatTableDataSource so we can have all sort,filter bells and whistles
  matTableDataSource: MatTableDataSource<any> = new MatTableDataSource();

  // Expose dataStream to simulate VirtualForOf.dataStream
  dataStream = this.matTableDataSource.connect().asObservable();

  renderedStream = new BehaviorSubject<any[]>([]);
  page$ = new BehaviorSubject<any>(null);

  attach(viewPort: CdkVirtualScrollViewport) {
    if (!viewPort) {
      throw new Error('ViewPort is undefined');
    }
    this._viewPort = viewPort;

    this.initFetchingOnScrollUpdates();

    // Attach DataSource as CdkVirtualForOf so ViewPort can access dataStream
    this._viewPort.attach(this as any);

    // Trigger range change so that 1st page can be loaded
    this._viewPort.setRenderedRange({ start: 0, end: 5 });
  }

  // Called by CDK Table
  connect(): Observable<any[]> {
    const tableData = this.matTableDataSource.connect();
    const filtered =
      this._viewPort === undefined
        ? tableData
        : this.filterByRangeStream(tableData);

    filtered.subscribe(data => {
      this.renderedStream.next(data);
    });

    return this.renderedStream.asObservable();
  }

  disconnect(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private initFetchingOnScrollUpdates() {
    this._subscription = this._viewPort.renderedRangeStream
      .pipe(
        switchMap(range => this._getPagesToDownload(range)),
        filter(page => !this._pageCache.has(page)),
        exhaustMap(page => this._fetchAndUpdate(page))
      )
      .subscribe();
  }

  private _getPagesToDownload({ start, end }: { start: number; end: number; }) {
    const startPage = this._getPageForIndex(start);
    const endPage = this._getPageForIndex(end + this._pageOffset);
    const pages: number[] = [];
    
    for (let i = startPage; i <= endPage && i < this.pages; i++) {
      if (!this._pageCache.has(i)) {
        pages.push(i);
      }
    }
    return from(pages);
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private filterByRangeStream(tableData: Observable<any[]>) {
    const rangeStream = this._viewPort.renderedRangeStream.pipe(
      startWith({} as ListRange)
    );
    const filtered = combineLatest(tableData, rangeStream).pipe(
      map(([data, { start, end }]) => {
        return start === null || end === null ? data : data.slice(start, end);
      })
    );
    return filtered;
  }
    private _fetchAndUpdate(page: number): Observable<any[]> {
      this.page$.next(page);
      return of([]);
    }
  }
  `;

  writeToFile({
    id: table.id,
    projectPath: projectPath,
    code,
    type: FileType.SERVICE,
    optionalName: `${table.id}InfiniteScroll`
  });

  return code;
};

export { setTableInfiniteScrollService };
