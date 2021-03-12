import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { DataManagerService } from '../../services/data-manager/data-manager.service';

// TODO: Replace this with your own data model type
export interface SummaryTableItem {
  id: string,
  name: string;
  total_cases: number;
  daily_new_cases: number;
  total_deaths: number;
  daily_new_deaths: number;  
}

/**
 * Data source for the SummaryTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SummaryTableDataSource extends DataSource<SummaryTableItem> {
  data: SummaryTableItem[];
  paginator: MatPaginator;
  sort: MatSort;
  
  constructor(private dataManger: DataManagerService) {
    super();
    this.dataManger.getCovidSummaryTableData().subscribe(data => {
      this.fillData(data);         
     });
  }

  fillData(remoteData){
    let temp: SummaryTableItem[] = [];
    for (let [key, value] of Object.entries(remoteData)) {
      temp.push({
        id: key, 
        name: value["location"], 
        total_cases: value["total_cases"],
        daily_new_cases: value["new_cases"],
        total_deaths: value["total_deaths"],
        daily_new_deaths: value["new_deaths"]});
  }
    this.data = temp;  
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SummaryTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SummaryTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SummaryTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'total_cases': return compare(a.total_cases, b.total_cases, isAsc);
        case 'daily_new_cases': return compare(a.daily_new_cases, b.daily_new_cases, isAsc);
        case 'total_deaths': return compare(a.total_deaths, b.total_deaths, isAsc);
        case 'daily_new_deaths': return compare(a.daily_new_deaths, b.daily_new_deaths, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
