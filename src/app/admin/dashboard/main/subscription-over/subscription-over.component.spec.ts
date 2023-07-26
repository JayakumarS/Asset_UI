import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOverComponent } from './subscription-over.component';

describe('SubscriptionOverComponent', () => {
  let component: SubscriptionOverComponent;
  let fixture: ComponentFixture<SubscriptionOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
