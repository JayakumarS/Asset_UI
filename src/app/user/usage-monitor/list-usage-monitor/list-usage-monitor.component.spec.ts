import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsageMonitorComponent } from './list-usage-monitor.component';

describe('ListUsageMonitorComponent', () => {
  let component: ListUsageMonitorComponent;
  let fixture: ComponentFixture<ListUsageMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsageMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsageMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
