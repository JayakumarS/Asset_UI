import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUtilityChangeLogReportComponent } from './add-utility-change-log-report.component';

describe('AddUtilityChangeLogReportComponent', () => {
  let component: AddUtilityChangeLogReportComponent;
  let fixture: ComponentFixture<AddUtilityChangeLogReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUtilityChangeLogReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUtilityChangeLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
