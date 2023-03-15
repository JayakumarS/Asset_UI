import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandUploadSuccessPopupComponent } from './brand-upload-success-popup.component';

describe('BrandUploadSuccessPopupComponent', () => {
  let component: BrandUploadSuccessPopupComponent;
  let fixture: ComponentFixture<BrandUploadSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandUploadSuccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandUploadSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
