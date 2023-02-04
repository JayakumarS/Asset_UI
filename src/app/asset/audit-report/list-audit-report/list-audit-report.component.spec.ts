import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuditReportComponent } from './list-audit-report.component';

describe('ListAuditReportComponent', () => {
  let component: ListAuditReportComponent;
  let fixture: ComponentFixture<ListAuditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAuditReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
