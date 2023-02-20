import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaintenanceAndRepairComponent } from './list-maintenance-and-repair.component';

describe('ListMaintenanceAndRepairComponent', () => {
  let component: ListMaintenanceAndRepairComponent;
  let fixture: ComponentFixture<ListMaintenanceAndRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaintenanceAndRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaintenanceAndRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
