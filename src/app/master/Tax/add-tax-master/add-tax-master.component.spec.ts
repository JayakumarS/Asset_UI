import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxMasterComponent } from './add-tax-master.component';

describe('AddTaxMasterComponent', () => {
  let component: AddTaxMasterComponent;
  let fixture: ComponentFixture<AddTaxMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
