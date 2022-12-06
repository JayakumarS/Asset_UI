import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemPropertiesComponent } from './add-item-properties.component';

describe('AddItemPropertiesComponent', () => {
  let component: AddItemPropertiesComponent;
  let fixture: ComponentFixture<AddItemPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
