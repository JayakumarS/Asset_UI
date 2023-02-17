import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUsageMonitorComponent } from './delete-usage-monitor.component';

describe('DeleteUsageMonitorComponent', () => {
  let component: DeleteUsageMonitorComponent;
  let fixture: ComponentFixture<DeleteUsageMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUsageMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUsageMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
