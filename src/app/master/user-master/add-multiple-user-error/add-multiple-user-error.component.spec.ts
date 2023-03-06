import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleUserErrorComponent } from './add-multiple-user-error.component';

describe('AddMultipleUserErrorComponent', () => {
  let component: AddMultipleUserErrorComponent;
  let fixture: ComponentFixture<AddMultipleUserErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleUserErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleUserErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
