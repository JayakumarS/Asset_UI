import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemCategoryComponent } from './list-item-category.component';

describe('ListItemCategoryComponent', () => {
  let component: ListItemCategoryComponent;
  let fixture: ComponentFixture<ListItemCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
