import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountingYearComponent } from './list-accounting-year-close.component';

describe('ListCurrencyComponent', () => {
  let component: ListAccountingYearComponent;
  let fixture: ComponentFixture<ListAccountingYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccountingYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccountingYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
