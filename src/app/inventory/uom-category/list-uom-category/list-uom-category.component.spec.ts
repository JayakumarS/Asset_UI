import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUOMCategoryComponent } from './list-uom-category.component';

describe('ListUOMCategoryComponent', () => {
  let component: ListUOMCategoryComponent;
  let fixture: ComponentFixture<ListUOMCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUOMCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUOMCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
