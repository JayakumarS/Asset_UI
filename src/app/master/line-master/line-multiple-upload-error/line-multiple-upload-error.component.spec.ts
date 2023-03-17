import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMultipleUploadErrorComponent } from './line-multiple-upload-error.component';

describe('LineMultipleUploadErrorComponent', () => {
  let component: LineMultipleUploadErrorComponent;
  let fixture: ComponentFixture<LineMultipleUploadErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineMultipleUploadErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineMultipleUploadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
