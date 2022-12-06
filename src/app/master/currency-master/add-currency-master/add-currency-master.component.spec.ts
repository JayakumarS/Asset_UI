import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurrencyMasterComponent } from './add-currency-master.component';

describe('AddCurrencyMasterComponent', () => {
  let component: AddCurrencyMasterComponent;
  let fixture: ComponentFixture<AddCurrencyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCurrencyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCurrencyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
