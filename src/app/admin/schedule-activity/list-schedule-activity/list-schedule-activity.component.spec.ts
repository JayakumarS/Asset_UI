import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduleActivityComponent } from './list-schedule-activity.component';

describe('ListScheduleActivityComponent', () => {
  let component: ListScheduleActivityComponent;
  let fixture: ComponentFixture<ListScheduleActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScheduleActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduleActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
