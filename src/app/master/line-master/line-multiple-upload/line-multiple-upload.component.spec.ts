import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMultipleUploadComponent } from './line-multiple-upload.component';

describe('LineMultipleUploadComponent', () => {
  let component: LineMultipleUploadComponent;
  let fixture: ComponentFixture<LineMultipleUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineMultipleUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineMultipleUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
