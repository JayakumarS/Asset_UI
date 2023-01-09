import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountingPopupComponent } from './customer-accounting-popup.component';

describe('CustomerAccountingPopupComponent', () => {
  let component: CustomerAccountingPopupComponent;
  let fixture: ComponentFixture<CustomerAccountingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAccountingPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
