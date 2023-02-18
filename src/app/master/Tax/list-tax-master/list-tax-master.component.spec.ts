import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaxMasterComponent } from './list-tax-master.component';

describe('ListTaxMasterComponent', () => {
  let component: ListTaxMasterComponent;
  let fixture: ComponentFixture<ListTaxMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaxMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaxMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
