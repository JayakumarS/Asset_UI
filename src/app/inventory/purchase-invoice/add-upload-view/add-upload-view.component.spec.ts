import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUploadViewComponent } from './add-upload-view.component';

describe('AddUploadViewComponent', () => {
  let component: AddUploadViewComponent;
  let fixture: ComponentFixture<AddUploadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUploadViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUploadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
