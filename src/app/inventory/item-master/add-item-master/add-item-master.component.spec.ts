import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemMasterComponent } from './add-item-master.component';

describe('AddItemMasterComponent', () => {
  let component: AddItemMasterComponent;
  let fixture: ComponentFixture<AddItemMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
