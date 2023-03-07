import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorUploadComponent } from './error-upload.component';

describe('ErrorUploadComponent', () => {
  let component: ErrorUploadComponent;
  let fixture: ComponentFixture<ErrorUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
