import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMaintenanceAndRepairComponent } from './delete-maintenance-and-repair.component';

describe('DeleteMaintenanceAndRepairComponent', () => {
  let component: DeleteMaintenanceAndRepairComponent;
  let fixture: ComponentFixture<DeleteMaintenanceAndRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMaintenanceAndRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMaintenanceAndRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
