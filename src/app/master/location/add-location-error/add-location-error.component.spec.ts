import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationErrorComponent } from './add-location-error.component';

describe('AddLocationErrorComponent', () => {
  let component: AddLocationErrorComponent;
  let fixture: ComponentFixture<AddLocationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocationErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
