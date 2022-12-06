import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUomCategoryComponent } from './delete-uom-category.component';

describe('DeleteUomCategoryComponent', () => {
  let component: DeleteUomCategoryComponent;
  let fixture: ComponentFixture<DeleteUomCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUomCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUomCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
