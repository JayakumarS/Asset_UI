import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuditReportComponent } from './add-audit-report.component';

describe('AddAuditReportComponent', () => {
  let component: AddAuditReportComponent;
  let fixture: ComponentFixture<AddAuditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAuditReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
