import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockVerificationComponent } from './add-stock-verification.component';

describe('AddStockVerificationComponent', () => {
  let component: AddStockVerificationComponent;
  let fixture: ComponentFixture<AddStockVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStockVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
