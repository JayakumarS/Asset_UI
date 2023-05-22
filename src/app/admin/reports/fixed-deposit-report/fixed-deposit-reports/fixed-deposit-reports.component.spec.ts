import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDepositReportsComponent } from './fixed-deposit-reports.component';

describe('FixedDepositReportsComponent', () => {
  let component: FixedDepositReportsComponent;
  let fixture: ComponentFixture<FixedDepositReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedDepositReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDepositReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
