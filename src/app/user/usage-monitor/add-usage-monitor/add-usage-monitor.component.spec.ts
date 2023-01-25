import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsageMonitorComponent } from './add-usage-monitor.component';

describe('AddUsageMonitorComponent', () => {
  let component: AddUsageMonitorComponent;
  let fixture: ComponentFixture<AddUsageMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsageMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsageMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
