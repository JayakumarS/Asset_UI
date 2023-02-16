import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalesOrderComponent } from './delete-sales-order.component';

describe('DeleteSalesOrderComponent', () => {
  let component: DeleteSalesOrderComponent;
  let fixture: ComponentFixture<DeleteSalesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSalesOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
