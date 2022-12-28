import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInStockComponent } from './list-in-stock.component';

describe('ListInStockComponent', () => {
  let component: ListInStockComponent;
  let fixture: ComponentFixture<ListInStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
