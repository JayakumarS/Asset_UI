import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetRequisitionComponent } from './add-asset-requisition.component';

describe('AddAssetRequisitionComponent', () => {
  let component: AddAssetRequisitionComponent;
  let fixture: ComponentFixture<AddAssetRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
