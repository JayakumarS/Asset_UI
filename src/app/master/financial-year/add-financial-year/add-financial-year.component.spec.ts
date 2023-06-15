import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinancialYearComponent } from './add-financial-year.component';

describe('AddFinancialYearComponent', () => {
  let component: AddFinancialYearComponent;
  let fixture: ComponentFixture<AddFinancialYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFinancialYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFinancialYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
