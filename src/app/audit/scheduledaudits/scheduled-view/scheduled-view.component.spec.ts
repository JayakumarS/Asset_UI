import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledViewComponent } from './scheduled-view.component';

describe('ScheduledViewComponent', () => {
  let component: ScheduledViewComponent;
  let fixture: ComponentFixture<ScheduledViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
