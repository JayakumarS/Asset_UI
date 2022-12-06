import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemPropertiesComponent } from './list-item-properties.component';

describe('ListItemPropertiesComponent', () => {
  let component: ListItemPropertiesComponent;
  let fixture: ComponentFixture<ListItemPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
