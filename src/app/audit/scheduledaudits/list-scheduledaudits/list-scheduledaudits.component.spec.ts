import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduledauditsComponent } from './list-scheduledaudits.component';

describe('ListScheduledauditsComponent', () => {
  let component: ListScheduledauditsComponent;
  let fixture: ComponentFixture<ListScheduledauditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScheduledauditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduledauditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
