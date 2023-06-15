import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinancialYearComponent } from './list-financial-year.component';

describe('ListFinancialYearComponent', () => {
  let component: ListFinancialYearComponent;
  let fixture: ComponentFixture<ListFinancialYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFinancialYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinancialYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
