import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditComponent } from './manage-audit.component';

describe('ManageAuditComponent', () => {
  let component: ManageAuditComponent;
  let fixture: ComponentFixture<ManageAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
