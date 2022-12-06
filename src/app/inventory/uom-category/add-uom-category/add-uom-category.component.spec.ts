import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUOMCategoryComponent } from './add-uom-category.component';

describe('AddUOMCategoryComponent', () => {
  let component: AddUOMCategoryComponent;
  let fixture: ComponentFixture<AddUOMCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUOMCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUOMCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
