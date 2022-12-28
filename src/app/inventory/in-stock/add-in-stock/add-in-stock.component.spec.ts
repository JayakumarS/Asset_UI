import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInStockComponent } from './add-in-stock.component';

describe('AddInStockComponent', () => {
  let component: AddInStockComponent;
  let fixture: ComponentFixture<AddInStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
