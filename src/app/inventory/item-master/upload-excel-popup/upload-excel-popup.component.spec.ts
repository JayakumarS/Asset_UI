import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExcelPopupComponent } from './upload-excel-popup.component';

describe('UploadExcelPopupComponent', () => {
  let component: UploadExcelPopupComponent;
  let fixture: ComponentFixture<UploadExcelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadExcelPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExcelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
