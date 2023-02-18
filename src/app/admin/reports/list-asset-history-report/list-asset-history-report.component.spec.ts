import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssetHistoryReportComponent } from './list-asset-history-report.component';

describe('ListAssetHistoryReportComponent', () => {
  let component: ListAssetHistoryReportComponent;
  let fixture: ComponentFixture<ListAssetHistoryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssetHistoryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssetHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
