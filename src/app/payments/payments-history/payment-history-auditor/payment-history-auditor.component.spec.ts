import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryAuditorComponent } from './payment-history-auditor.component';

describe('PaymentHistoryAuditorComponent', () => {
  let component: PaymentHistoryAuditorComponent;
  let fixture: ComponentFixture<PaymentHistoryAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentHistoryAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
