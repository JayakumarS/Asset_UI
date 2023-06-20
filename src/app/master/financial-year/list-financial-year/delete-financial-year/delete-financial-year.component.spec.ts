import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFinancialYearComponent } from './delete-financial-year.component';

describe('DeleteFinancialYearComponent', () => {
  let component: DeleteFinancialYearComponent;
  let fixture: ComponentFixture<DeleteFinancialYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFinancialYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFinancialYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
