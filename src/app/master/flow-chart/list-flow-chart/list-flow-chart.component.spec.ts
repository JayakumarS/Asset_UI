import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFlowChartComponent } from './list-flow-chart.component';

describe('ListFlowChartComponent', () => {
  let component: ListFlowChartComponent;
  let fixture: ComponentFixture<ListFlowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFlowChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFlowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
