import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepreciationComponent } from './add-depreciation.component';

describe('AddDepreciationComponent', () => {
  let component: AddDepreciationComponent;
  let fixture: ComponentFixture<AddDepreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepreciationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
