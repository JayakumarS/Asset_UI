import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixedDepositComponent } from './add-fixed-deposit.component';

describe('AddFixedDepositComponent', () => {
  let component: AddFixedDepositComponent;
  let fixture: ComponentFixture<AddFixedDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFixedDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFixedDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
