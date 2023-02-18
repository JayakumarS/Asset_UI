import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowChartPopupComponent } from './flow-chart-popup.component';

describe('FlowChartPopupComponent', () => {
  let component: FlowChartPopupComponent;
  let fixture: ComponentFixture<FlowChartPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowChartPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowChartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
