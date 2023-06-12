import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  OnChanges
} from '@angular/core';
import { SortableHeaderDirective, SortEvent } from '../../directives/sortable.directive';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ColumnConfigItem } from 'src/app/models/ColumnConfigItem';
import { Observable, of, Subject, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  @ViewChild('largeTable', { static: false }) largeTable: CdkVirtualScrollViewport;
  @ViewChild('smallTable', { static: false }) smallTable: CdkVirtualScrollViewport;
  @ViewChild('filterWrapper', { static: false }) filterWrapper: ElementRef;

  @Input() filterConfigItems: any[] = [];
  @Input() actionButtons: any[] = [];
  @Input() columnConfig: ColumnConfigItem[] = [];
  @Input() hasActionCol: boolean = false;
  @Input() hasActionColEdit: boolean = false;
  @Input() hasActionColSelect: boolean = false;
  @Input() hasActionColDuplicate: boolean = false;
  @Input() canBulkEdit = false;
  @Input() canSearch = true;
  @Input() page = 'data';
  @Input() loading: boolean;
  @Input() error: boolean;
  @Input() errorMessage: string;
  @Input() iconClass: string;
  @Input() clearFilters: boolean;
  @Input() downloadButton: boolean = false;
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Input() pageLinks: any = {};
  @Input() itemCount: number = 0;

  @Input() set data(value: any[]) {
    if (value.length > 0) {
      this.addHeadersToTable(value).then(() => {
        this.addDataToTable(value);
        this.setMobileVirtualScrollingItemHeight(value[0]);
        // this.setTablePaddingBottom();
      });
    }
  }

  @Output() scrollEnd = new EventEmitter<boolean>();
  @Output() onFilter = new EventEmitter<any>();
  @Output() searchTerm = new EventEmitter<string>();
  @Output() onClickViewItem = new EventEmitter<any>();
  @Output() onClickEditItem = new EventEmitter<any>();
  @Output() onClickSelectItem = new EventEmitter<any>();
  @Output() onClickDuplicateItem = new EventEmitter<any>();
  @Output() onClickRetry = new EventEmitter<any>();
  @Output() onClickSort = new EventEmitter<any>();
  @Output() onActionClick = new EventEmitter<string>();
  @Output() sortByColumn = new EventEmitter<object>();
  @Output() onClickAddItem = new EventEmitter<any>();
  @Output() onDownloadClick = new EventEmitter<string>();
  @Output() onPageClick = new EventEmitter<string>();

  private ngUnsubscribe = new Subject();

  headerColumnNames: any[] = [];
  items: any[] = [];
  ommitedColumns: any[] = [];
  mobileVirtualScrollingItemHeight = 0;
  filtering = {};
  filterPills: any[] = [];
  originalViewHeightpx;
  filtersRowOriginalSize;

  searchTermValue: string;
  selectedTableItem;

  toolTipText = `This is a tooltip`;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  addHeadersToTable(data) {
    return new Promise<any>((resolve, reject) => {
      if (data.length > 0 && this.headerColumnNames.length === 0) {
        Object.keys(data[0]).map(key => {
          if (key !== 'html' && key !== 'id' && this.canAdd(key)) {
            this.headerColumnNames.push({
              name: key.replace(/([a-z])([A-Z])/g, '$1 $2').toLocaleLowerCase(),
              keyValue: key,
              isSortable: false,
              sort: ''
            });
          }
        });

        this.columnConfig.forEach((item: ColumnConfigItem) => {
          const oldName = item.oldName.replace(/([a-z])([A-Z])/g, '$1 $2');
          let newName = null;
          if (item.newName && oldName) {
            newName = item.newName;
            const index = this.headerColumnNames.findIndex(x => x.name === oldName.toLocaleLowerCase());
            this.headerColumnNames[index].name = item.newName;
          }
          if (item.isSortable === true) {
            let index;
            if (newName) {
              index = this.headerColumnNames.findIndex(x => x.name === newName);
            } else {
              index = this.headerColumnNames.findIndex(x => x.name === oldName.toLocaleLowerCase());
            }
            if (index > -1) {
              this.headerColumnNames[index].isSortable = true;
            }
          }
        });
      }

      resolve(data);
    });
  }

  canAdd(key) {
    let canAdd = true;

    this.columnConfig.forEach((item: ColumnConfigItem) => {

      if (item.oldName == key) {
        if (item.isVisible === false) {
          canAdd = false;
        }
      }
    });

    return canAdd;
  }

  addDataToTable(data: any[]) {
    data.forEach((item) => {
      if (!item.html) {
        const tableItems = [];
        Object.keys(item).map((key) => {
          let _index = this.headerColumnNames.findIndex(x => x.keyValue === key);
          if (key !== 'html' && key !== 'id') {
            if (_index != -1) {
              tableItems.push(item[key]);
            }
          }
        });
        item.html = tableItems;
      }
    });
    this.items = data;
  }

  onSort({ column, direction }: SortEvent) {
    let sortingColumn;
    const sortingDirection = direction === 'desc' ? false : true;

    this.headerColumnNames.forEach((columnName) => {
      if (columnName.keyValue === column) {
        sortingColumn = [column.split(/(?=[A-Z])/).join('_').toLocaleLowerCase()];
        columnName.sort = direction;
      } else {
        columnName.sort = '';
      }
    });

    const sorting = {
      [sortingColumn]: sortingDirection
    };

    this.onClickSort.emit(sorting);
  }

  sortItems(sortColumn) {
    let sortingColumn;
    let column = sortColumn.keyValue;

    this.headerColumnNames.forEach((columnName) => {
      if (columnName.keyValue === column) {
        sortingColumn = column.split(/(?=[A-Z])/).join('_').toLocaleLowerCase();
      }
    });

    this.onClickSort.emit(sortingColumn);
  }

  private setMobileVirtualScrollingItemHeight(item: any) {
    if (item && item.hasOwnProperty('html')) {
      this.mobileVirtualScrollingItemHeight = (30 * item.html.length) + 26;
    }
  }

  private setTablePaddingBottom() {
    if (document.getElementsByClassName('large-table')[0] && document.getElementsByClassName('small-table')[0]) {
      const largeTable = document.getElementsByClassName('large-table')[0];
      const smallTable = document.getElementsByClassName('small-table')[0];

      // @ts-ignore
      largeTable.setAttribute('style', `padding-bottom: ${160 + this.filterWrapper.nativeElement.offsetHeight}px !important`);
      // @ts-ignore
      smallTable.setAttribute('style', `padding-bottom: ${280 + this.filterWrapper.nativeElement.offsetHeight}px !important`);
    }
  }


  nextBatchLargeTable(event) {
    if ((this.items.length > 0) && (event + (Math.round(this.largeTable.getViewportSize() / 49))) >= (this.largeTable.getDataLength())) {
      this.scrollEnd.emit(true);
    }
  }

  nextBatchSmallTable(event) {
    if ((this.items.length > 0) && (event + (Math.round(this.smallTable.getViewportSize() / this.mobileVirtualScrollingItemHeight)) + 2) >= (this.smallTable.getDataLength())) {
      this.scrollEnd.emit(true);
    }
  }

  viewItem(item: any) {
    this.selectedTableItem = item;
    this.onClickViewItem.emit(item);
  }

  editItem(item: any) {
    this.onClickEditItem.emit(item);
  }
  
  selectItem(item: any) {
    this.onClickSelectItem.emit(item);
  }

  duplicateItem(item: any) {
    this.onClickDuplicateItem.emit(item);
  }

  addFilter(id: any, key: any) {
    const filterButton = {
      // @ts-ignore
      filter: id,
      filterCategory: key,
    };

    this.onFilter.emit(filterButton);

    setTimeout(() => {
      this.getnewCalculatedViewHeight();
    });
  }

  retry() {
    this.onClickRetry.emit();
  }

  onFilterRemove(filterObj: any) {
    if (Array.isArray(this.filtering[filterObj.filterCategory])) {
      this.filtering[filterObj.filterCategory].splice(this.filtering[filterObj.filterCategory].indexOf(filterObj.filter), 1);
    }

    this.onFilter.emit(this.camelCaseToSnakeCase(this.filtering));
    setTimeout(() => {
      this.getnewCalculatedViewHeight();
    });
  }

  camelCaseToSnakeCase(values: any) {
    const filteringOptions = {};
    Object.keys(values).map((key) => {
      const newKey = key.split(/(?=[A-Z])/).join('_').toLocaleLowerCase();
      filteringOptions[newKey] = values[key];
    });
    return filteringOptions;
  }

  search() {
    this.searchTerm.emit(this.searchTermValue);
  }

  actionClick(action) {
    this.onActionClick.emit(action);
  }

  loadPage(page) {
    this.onPageClick.emit(page);
  }

  ngOnChanges() {
    if (this.clearFilters) {
      this.filtering = [];
      this.filterPills = [];
    }
  }

  getnewCalculatedViewHeight() {
    const filtersRow = document.getElementById('filter-pills-div');
    const viewHeight = document.getElementById('view-port-height');
    if (filtersRow && viewHeight && this.filterPills && this.filterPills.length > 0) {
      if (!this.originalViewHeightpx) {
        this.originalViewHeightpx = viewHeight.clientHeight;
      }
      if (filtersRow.clientHeight !== this.filtersRowOriginalSize) {
        this.filtersRowOriginalSize = filtersRow.clientHeight;
        const newHeight = this.originalViewHeightpx - filtersRow.clientHeight;
        viewHeight.style.minHeight = `${newHeight}px`;
      }
    } else {
      if (this.originalViewHeightpx) {
        viewHeight.style.minHeight = `${this.originalViewHeightpx}px`;
      }
    }
  }

  download(params) {
    // this.onDownloadClick.emit(csvList);
  }

  preventEnterEvent(event: Event) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

