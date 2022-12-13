import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleActivityComponent } from './add-schedule-activity.component';

describe('AddScheduleActivityComponent', () => {
  let component: AddScheduleActivityComponent;
  let fixture: ComponentFixture<AddScheduleActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduleActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScheduleActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
