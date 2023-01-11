import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManageAuditComponent } from './delete-manage-audit.component';

describe('DeleteManageAuditComponent', () => {
  let component: DeleteManageAuditComponent;
  let fixture: ComponentFixture<DeleteManageAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteManageAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteManageAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
