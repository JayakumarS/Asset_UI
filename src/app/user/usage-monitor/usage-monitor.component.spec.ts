import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageMonitorComponent } from './usage-monitor.component';

describe('UsageMonitorComponent', () => {
  let component: UsageMonitorComponent;
  let fixture: ComponentFixture<UsageMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
