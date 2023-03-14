import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMultipleUploadErrorComponent } from './brand-multiple-upload-error.component';

describe('BrandMultipleUploadErrorComponent', () => {
  let component: BrandMultipleUploadErrorComponent;
  let fixture: ComponentFixture<BrandMultipleUploadErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandMultipleUploadErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMultipleUploadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
