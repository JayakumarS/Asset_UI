import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankRecieptsComponent } from './add-bank-reciepts.component';

describe('AddBankRecieptsComponent', () => {
  let component: AddBankRecieptsComponent;
  let fixture: ComponentFixture<AddBankRecieptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBankRecieptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBankRecieptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
