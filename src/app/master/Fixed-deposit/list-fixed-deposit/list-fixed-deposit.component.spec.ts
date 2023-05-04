import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFixedDepositComponent } from './list-fixed-deposit.component';

describe('ListFixedDepositComponent', () => {
  let component: ListFixedDepositComponent;
  let fixture: ComponentFixture<ListFixedDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFixedDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFixedDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
