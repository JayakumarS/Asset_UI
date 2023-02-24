import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBankReceiptComponent } from './delete-bank-receipt.component';

describe('DeleteBankReceiptComponent', () => {
  let component: DeleteBankReceiptComponent;
  let fixture: ComponentFixture<DeleteBankReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBankReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBankReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
