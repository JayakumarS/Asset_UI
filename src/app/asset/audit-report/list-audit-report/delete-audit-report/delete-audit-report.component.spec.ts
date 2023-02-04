import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAuditReportComponent } from './delete-audit-report.component';

describe('DeleteAuditReportComponent', () => {
  let component: DeleteAuditReportComponent;
  let fixture: ComponentFixture<DeleteAuditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAuditReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAuditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
