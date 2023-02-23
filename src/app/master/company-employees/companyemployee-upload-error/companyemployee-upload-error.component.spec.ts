import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyemployeeUploadErrorComponent } from './companyemployee-upload-error.component';

describe('CompanyemployeeUploadErrorComponent', () => {
  let component: CompanyemployeeUploadErrorComponent;
  let fixture: ComponentFixture<CompanyemployeeUploadErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyemployeeUploadErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyemployeeUploadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
