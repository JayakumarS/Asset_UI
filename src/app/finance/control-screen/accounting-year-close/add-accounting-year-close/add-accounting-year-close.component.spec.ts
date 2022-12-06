import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountingYearComponent } from './add-accounting-year-close.component';

describe('AddAccountingYearComponent', () => {
  let component: AddAccountingYearComponent;
  let fixture: ComponentFixture<AddAccountingYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccountingYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountingYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
