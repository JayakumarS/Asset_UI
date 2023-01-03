import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePurchaseInvoiceComponent } from './delete-purchase-invoice.component';

describe('DeletePurchaseInvoiceComponent', () => {
  let component: DeletePurchaseInvoiceComponent;
  let fixture: ComponentFixture<DeletePurchaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePurchaseInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
