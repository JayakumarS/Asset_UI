import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleAssetMasterComponent } from './add-multiple-asset-master.component';

describe('AddMultipleAssetMasterComponent', () => {
  let component: AddMultipleAssetMasterComponent;
  let fixture: ComponentFixture<AddMultipleAssetMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleAssetMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleAssetMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
