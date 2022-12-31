import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageAuditComponent } from './add-manage-audit.component';

describe('AddManageAuditComponent', () => {
  let component: AddManageAuditComponent;
  let fixture: ComponentFixture<AddManageAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManageAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManageAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
