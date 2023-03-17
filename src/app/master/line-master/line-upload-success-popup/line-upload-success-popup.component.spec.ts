import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineUploadSuccessPopupComponent } from './line-upload-success-popup.component';

describe('LineUploadSuccessPopupComponent', () => {
  let component: LineUploadSuccessPopupComponent;
  let fixture: ComponentFixture<LineUploadSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineUploadSuccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineUploadSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
