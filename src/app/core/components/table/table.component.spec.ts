import { HttpClientModule } from '@angular/common/http';
import { SortableHeaderDirective } from './../../directives/sortable.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { SanatizeHtmlPipe } from '../../pipes/sanatize-html/sanatize-html.pipe';
import { NoValueCheckPipe } from '../../pipes/no-value-check/no-value-check.pipe';
import { FormatFilterOptionsPipe } from '../../pipes/format-filter-options/format-filter-options.pipe';
import { GroupToSitesPipe } from '../../pipes/group-to-sites/group-to-sites.pipe';
import { CoreModule } from '../../core.module';
import { SharedModule } from 'src/app/shared-modules/shared-modules.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { RootStoreState } from 'src/app/root-store';
import { Store } from '@ngrx/store';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let store: Store<RootStoreState.RootState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [],
      imports: [
        ScrollDispatchModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([{
          path: 'test-1',
          children: [
            {
              path: 'test',
              children: [
                { path: 'test-step-1', children: [] }
              ]
            }
          ],
        }])
      ],
      providers: [
        provideMockStore({}),
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              params: of({ solutionId: '1-123', vrf: '123' }),
              firstChild: {
                snapshot: {
                  url: [
                    {
                      path: 'foo',
                    }
                  ],
                },
              }
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   it('nextBatch should emit true when the scroll reach the end', () => {
  //     spyOn(component.scrollEnd, 'emit');
  //     component.scrollItemsTotal = 5;
  //     component.onscrollEndCalled = 5;
  //     component.nextBatch(10, 10);
  //     expect(component.scrollEnd.emit).toHaveBeenCalledWith(true);
  //   });

  it('toggleSelectAll should change all items checked properties to true when checking select all', () => {
    const beforeData = [
      {
        checked: false
      },
      {
        checked: false
      }
    ];

    const afterData = [
      {
        checked: true
      },
      {
        checked: true
      }
    ];

    component.toggleSelectAll(true, beforeData);
    expect(beforeData).toEqual(afterData);
  });

  it('toggleSelectAll should concat passed in data to the bulk edit list when checking select all', () => {
    const data = [
      {
        checked: false
      },
      {
        checked: false
      }
    ];
    component.toggleSelectAll(true, data);
    expect(component.bulkEditList).toEqual(data);
  });

  it('toggleSelectAll should change all items checked properties to false when unchecking select all', () => {
    const beforeData = [
      {
        checked: true
      },
      {
        checked: true
      }
    ];

    const afterData = [
      {
        checked: false
      },
      {
        checked: false
      }
    ];

    component.toggleSelectAll(false, beforeData);
    expect(beforeData).toEqual(afterData);
  });

  it('toggleSelectAll should empty the bulk edit list when unchecking select all', () => {
    const data = [
      {
        checked: true
      },
      {
        checked: true
      }
    ];
    component.bulkEditList.push({});
    component.toggleSelectAll(false, data);
    expect(component.bulkEditList).toEqual([]);
  });

  it('addToBulkEditList should add the item to the bulkEditList if the checked is true', () => {
    const item = { name: 'test', checked: true };
    const mockClickEvent = new MouseEvent('click');

    spyOn(mockClickEvent, 'stopPropagation');
    component.addToBulkEditList(mockClickEvent, item.checked, item);
    expect(component.bulkEditList).toEqual([item]);
  });

  it('addToBulkEditList should remove the item to the bulkEditList if the checked is false', () => {
    component.bulkEditList = [{ name: 'mock', checked: true }];
    const item = { name: 'test', checked: false };
    const mockClickEvent = new MouseEvent('click');

    spyOn(mockClickEvent, 'stopPropagation');
    component.bulkEditList.push(item);
    component.addToBulkEditList(mockClickEvent, item.checked, item);
    expect(component.bulkEditList).toEqual([{ name: 'mock', checked: true }]);
  });

  it('addDataToTable should add only one value to the html array', () => {
    const data = [{
      name: 'Piet',
      html: null
    }];
    component.addDataToTable(data);
    expect(data).toEqual([{ name: 'Piet', html: ['Piet'] }]);
  });

  it('addDataToTable should not append data to the html array if the passed in object html array contains data', () => {
    const data = [{
      name: 'Piet',
      html: ['<div>Test</div>']
    }];
    component.addDataToTable(data);
    expect(data).toEqual([{ name: 'Piet', html: ['<div>Test</div>'] }]);
  });

  it('addDataToTable should not add values to the html array if the item key is in the ommitedColumns array', () => {
    const data = [{
      fullName: 'Piet',
      html: null
    }];
    component.ommitedColumns = [
      'full name'
    ];
    component.addDataToTable(data);
    expect(data).toEqual([{ fullName: 'Piet', html: [] }]);
  });

  it('viewItem should emit onClickViewItem with the selected item', () => {
    spyOn(component.onClickViewItem, 'emit');
    component.viewItem({ test: 'Test' });
    expect(component.onClickViewItem.emit).toHaveBeenCalledWith({ test: 'Test' });
  });

  it('addItem should emit onClickAddItem', () => {
    spyOn(component.onClickAddItem, 'emit');
    component.addItem();
    expect(component.onClickAddItem.emit).toHaveBeenCalled();
  });

  it('retry should emit onClickRetry', () => {
    spyOn(component.onClickRetry, 'emit');
    component.retry();
    expect(component.onClickRetry.emit).toHaveBeenCalled();
  });

  it('onSort should find the headerColumnName and set the sorting direction', () => {
    component.headerColumnNames = [
      {
        name: 'device name',
        keyValue: 'deviceName',
        isSortable: true,
        sort: ''
      },
      {
        name: 'status',
        keyValue: 'status',
        isSortable: true,
        sort: 'asc'
      }
    ];
    component.onSort({ column: 'deviceName', direction: 'asc' });
    expect(component.headerColumnNames).toEqual([
      {
        name: 'device name',
        keyValue: 'deviceName',
        isSortable: true,
        sort: 'asc'
      },
      {
        name: 'status',
        keyValue: 'status',
        isSortable: true,
        sort: ''
      }
    ]);
  });

  it('onSort should emit object key and value boolean false to sort', () => {
    spyOn(component.onClickSort, 'emit');
    component.onSort({ column: 'deviceType', direction: 'desc' });
    expect(component.onClickSort.emit).toHaveBeenCalledWith({ device_type: false });
  });

  it('onSort should emit object key and value boolean true to sort', () => {
    spyOn(component.onClickSort, 'emit');
    component.onSort({ column: 'deviceName', direction: 'asc' });
    expect(component.onClickSort.emit).toHaveBeenCalledWith({ device_name: true });
  });

  it('onSort should emit object key and empty object to sort', () => {
    spyOn(component.onClickSort, 'emit');
    component.onSort({ column: 'deviceName', direction: '' });
    expect(component.onClickSort.emit).toHaveBeenCalledWith({});
  });

  it('should prevent default behaviour if the enter button is tapped', () => {
    const eventMock = { code: 'Enter' };
    const keyEvent = new Event('keydown.enter');

    spyOn(keyEvent, 'preventDefault');
    component.preventEnterEvent(keyEvent);

    expect(keyEvent.preventDefault).toHaveBeenCalled();
  });

  //   it('search should emit the search term', () => {
  //     spyOn(component.searchTerm, 'emit');
  //     component.search('hello');
  //     expect(component.searchTerm.emit).toHaveBeenCalledWith('hello');
  //   });

});
