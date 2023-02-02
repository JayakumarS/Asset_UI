import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscardComponent } from './add-discard.component';

describe('AddDiscardComponent', () => {
  let component: AddDiscardComponent;
  let fixture: ComponentFixture<AddDiscardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiscardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
