import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountryMasterComponent } from './add-country-master.component';

describe('AddCountryMasterComponent', () => {
  let component: AddCountryMasterComponent;
  let fixture: ComponentFixture<AddCountryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCountryMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCountryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
