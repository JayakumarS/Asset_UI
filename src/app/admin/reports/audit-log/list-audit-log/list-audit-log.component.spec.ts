import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuditLogComponent } from './list-audit-log.component';

describe('ListAuditLogComponent', () => {
  let component: ListAuditLogComponent;
  let fixture: ComponentFixture<ListAuditLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAuditLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
