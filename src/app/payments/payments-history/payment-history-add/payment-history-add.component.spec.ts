import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryAddComponent } from './payment-history-add.component';

describe('PaymentHistoryAddComponent', () => {
  let component: PaymentHistoryAddComponent;
  let fixture: ComponentFixture<PaymentHistoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentHistoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
