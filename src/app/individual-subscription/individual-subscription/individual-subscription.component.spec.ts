import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualSubscriptionComponent } from './individual-subscription.component';

describe('IndividualSubscriptionComponent', () => {
  let component: IndividualSubscriptionComponent;
  let fixture: ComponentFixture<IndividualSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
