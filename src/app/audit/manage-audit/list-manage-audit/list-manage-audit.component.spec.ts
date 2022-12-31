import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManageAuditComponent } from './list-manage-audit.component';

describe('ListManageAuditComponent', () => {
  let component: ListManageAuditComponent;
  let fixture: ComponentFixture<ListManageAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListManageAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManageAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
