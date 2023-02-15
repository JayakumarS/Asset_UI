import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalesInvoiceComponent } from './delete-sales-invoice.component';

describe('DeleteSalesInvoiceComponent', () => {
  let component: DeleteSalesInvoiceComponent;
  let fixture: ComponentFixture<DeleteSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSalesInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
