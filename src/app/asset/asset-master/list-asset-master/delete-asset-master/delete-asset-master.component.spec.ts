import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAssetMasterComponent } from './delete-asset-master.component';

describe('DeleteAssetMasterComponent', () => {
  let component: DeleteAssetMasterComponent;
  let fixture: ComponentFixture<DeleteAssetMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAssetMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAssetMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
