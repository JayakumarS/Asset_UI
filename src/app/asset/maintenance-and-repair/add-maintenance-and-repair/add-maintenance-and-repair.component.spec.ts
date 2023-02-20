import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintenanceAndRepairComponent } from './add-maintenance-and-repair.component';

describe('AddMaintenanceAndRepairComponent', () => {
  let component: AddMaintenanceAndRepairComponent;
  let fixture: ComponentFixture<AddMaintenanceAndRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaintenanceAndRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaintenanceAndRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
