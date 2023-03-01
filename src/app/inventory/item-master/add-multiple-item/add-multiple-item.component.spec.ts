import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleItemComponent } from './add-multiple-item.component';

describe('AddMultipleItemComponent', () => {
  let component: AddMultipleItemComponent;
  let fixture: ComponentFixture<AddMultipleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
