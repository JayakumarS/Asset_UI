import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemCategoryComponent } from './delete-item-category.component';

describe('DeleteItemCategoryComponent', () => {
  let component: DeleteItemCategoryComponent;
  let fixture: ComponentFixture<DeleteItemCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteItemCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
