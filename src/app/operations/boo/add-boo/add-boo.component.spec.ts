import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBooComponent } from './add-boo.component';

describe('AddBooComponent', () => {
  let component: AddBooComponent;
  let fixture: ComponentFixture<AddBooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
