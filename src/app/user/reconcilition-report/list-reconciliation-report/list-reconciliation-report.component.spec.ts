import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReconciliationReportComponent } from './list-reconciliation-report.component';

describe('ListReconciliationReportComponent', () => {
  let component: ListReconciliationReportComponent;
  let fixture: ComponentFixture<ListReconciliationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReconciliationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReconciliationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
