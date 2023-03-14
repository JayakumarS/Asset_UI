import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleUploadBrandComponent } from './multiple-upload-brand.component';

describe('MultipleUploadBrandComponent', () => {
  let component: MultipleUploadBrandComponent;
  let fixture: ComponentFixture<MultipleUploadBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleUploadBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleUploadBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
