import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateClickComponent } from './date-click.component';

describe('DateClickComponent', () => {
  let component: DateClickComponent;
  let fixture: ComponentFixture<DateClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
