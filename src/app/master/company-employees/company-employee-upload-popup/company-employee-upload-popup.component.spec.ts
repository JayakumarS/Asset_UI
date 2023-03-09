import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeeUploadPopupComponent } from './company-employee-upload-popup.component';

describe('CompanyEmployeeUploadPopupComponent', () => {
  let component: CompanyEmployeeUploadPopupComponent;
  let fixture: ComponentFixture<CompanyEmployeeUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyEmployeeUploadPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEmployeeUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
