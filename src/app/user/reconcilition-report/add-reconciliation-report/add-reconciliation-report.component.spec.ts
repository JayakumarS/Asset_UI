import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReconciliationReportComponent } from './add-reconciliation-report.component';

describe('AddReconciliationReportComponent', () => {
  let component: AddReconciliationReportComponent;
  let fixture: ComponentFixture<AddReconciliationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReconciliationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReconciliationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
