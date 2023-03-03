import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationMultipleUploadComponent } from './add-location-multiple-upload.component';

describe('AddLocationMultipleUploadComponent', () => {
  let component: AddLocationMultipleUploadComponent;
  let fixture: ComponentFixture<AddLocationMultipleUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocationMultipleUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationMultipleUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
