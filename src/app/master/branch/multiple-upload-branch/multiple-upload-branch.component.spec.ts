import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleUploadBranchComponent } from './multiple-upload-branch.component';

describe('MultipleUploadBranchComponent', () => {
  let component: MultipleUploadBranchComponent;
  let fixture: ComponentFixture<MultipleUploadBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleUploadBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleUploadBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
