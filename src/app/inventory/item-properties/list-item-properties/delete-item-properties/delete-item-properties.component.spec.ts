import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemPropertiesComponent } from './delete-item-properties.component';

describe('DeleteItemPropertiesComponent', () => {
  let component: DeleteItemPropertiesComponent;
  let fixture: ComponentFixture<DeleteItemPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteItemPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteItemPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
