import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchedulelistComponent } from './add-schedulelist.component';

describe('AddSchedulelistComponent', () => {
  let component: AddSchedulelistComponent;
  let fixture: ComponentFixture<AddSchedulelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchedulelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchedulelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
