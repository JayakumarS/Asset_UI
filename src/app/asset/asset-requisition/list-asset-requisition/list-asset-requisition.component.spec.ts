import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssetRequisitionComponent } from './list-asset-requisition.component';

describe('ListAssetRequisitionComponent', () => {
  let component: ListAssetRequisitionComponent;
  let fixture: ComponentFixture<ListAssetRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssetRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssetRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
