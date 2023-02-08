import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAuditReportComponent } from './print-audit-report.component';

describe('PrintAuditReportComponent', () => {
  let component: PrintAuditReportComponent;
  let fixture: ComponentFixture<PrintAuditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintAuditReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAuditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
