import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduleActivityComponent } from './delete-schedule-activity.component';

describe('DeleteScheduleActivityComponent', () => {
  let component: DeleteScheduleActivityComponent;
  let fixture: ComponentFixture<DeleteScheduleActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteScheduleActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScheduleActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
