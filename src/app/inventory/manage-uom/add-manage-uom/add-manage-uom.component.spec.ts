import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageUomComponent } from './add-manage-uom.component';

describe('AddManageUomComponent', () => {
  let component: AddManageUomComponent;
  let fixture: ComponentFixture<AddManageUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManageUomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManageUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
