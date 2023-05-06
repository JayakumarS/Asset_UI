import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualWidgetComponent } from './individual-widget.component';

describe('IndividualWidgetComponent', () => {
  let component: IndividualWidgetComponent;
  let fixture: ComponentFixture<IndividualWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
