import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFixedDepositComponent } from './delete-fixed-deposit.component';

describe('DeleteFixedDepositComponent', () => {
  let component: DeleteFixedDepositComponent;
  let fixture: ComponentFixture<DeleteFixedDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFixedDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFixedDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
