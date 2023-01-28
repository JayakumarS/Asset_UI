import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUtilityChangeLogReportComponent } from './list-utility-change-log-report.component';

describe('ListUtilityChangeLogReportComponent', () => {
  let component: ListUtilityChangeLogReportComponent;
  let fixture: ComponentFixture<ListUtilityChangeLogReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUtilityChangeLogReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUtilityChangeLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
