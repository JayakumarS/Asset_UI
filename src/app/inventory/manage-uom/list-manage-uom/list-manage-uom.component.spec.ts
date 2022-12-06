import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManageUomComponent } from './list-manage-uom.component';

describe('ListManageUomComponent', () => {
  let component: ListManageUomComponent;
  let fixture: ComponentFixture<ListManageUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListManageUomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListManageUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
