import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePlanCalendarListComponent } from './pre-plan-calendar-list.component';

describe('PrePlanCalendarListComponent', () => {
  let component: PrePlanCalendarListComponent;
  let fixture: ComponentFixture<PrePlanCalendarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrePlanCalendarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePlanCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
