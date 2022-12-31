import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuditReportsComponent } from './list-audit-reports.component';

describe('ListAuditReportsComponent', () => {
  let component: ListAuditReportsComponent;
  let fixture: ComponentFixture<ListAuditReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAuditReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuditReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
