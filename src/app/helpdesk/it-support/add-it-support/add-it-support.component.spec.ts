import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItSupportComponent } from './add-it-support.component';

describe('AddItSupportComponent', () => {
  let component: AddItSupportComponent;
  let fixture: ComponentFixture<AddItSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
