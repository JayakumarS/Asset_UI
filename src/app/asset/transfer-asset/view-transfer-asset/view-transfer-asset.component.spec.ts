import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransferAssetComponent } from './view-transfer-asset.component';

describe('ViewTransferAssetComponent', () => {
  let component: ViewTransferAssetComponent;
  let fixture: ComponentFixture<ViewTransferAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransferAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransferAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
