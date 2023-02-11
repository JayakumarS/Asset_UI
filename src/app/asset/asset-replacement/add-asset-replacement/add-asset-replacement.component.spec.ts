import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetReplacementComponent } from './add-asset-replacement.component';

describe('AddAssetReplacementComponent', () => {
  let component: AddAssetReplacementComponent;
  let fixture: ComponentFixture<AddAssetReplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetReplacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
