import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssetReplacementComponent } from './list-asset-replacement.component';

describe('ListAssetReplacementComponent', () => {
  let component: ListAssetReplacementComponent;
  let fixture: ComponentFixture<ListAssetReplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssetReplacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssetReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
