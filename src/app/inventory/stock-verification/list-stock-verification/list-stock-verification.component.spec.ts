import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockVerificationComponent } from './list-stock-verification.component';

describe('ListStockVerificationComponent', () => {
  let component: ListStockVerificationComponent;
  let fixture: ComponentFixture<ListStockVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStockVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStockVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
