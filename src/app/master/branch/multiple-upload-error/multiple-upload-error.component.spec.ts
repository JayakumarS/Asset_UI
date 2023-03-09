import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleUploadErrorComponent } from './multiple-upload-error.component';

describe('MultipleUploadErrorComponent', () => {
  let component: MultipleUploadErrorComponent;
  let fixture: ComponentFixture<MultipleUploadErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleUploadErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleUploadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
