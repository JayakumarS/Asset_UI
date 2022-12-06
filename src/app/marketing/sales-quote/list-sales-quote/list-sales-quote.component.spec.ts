import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalesQuoteComponent } from './list-sales-quote.component';

describe('ListSalesQuoteComponent', () => {
  let component: ListSalesQuoteComponent;
  let fixture: ComponentFixture<ListSalesQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSalesQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalesQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
