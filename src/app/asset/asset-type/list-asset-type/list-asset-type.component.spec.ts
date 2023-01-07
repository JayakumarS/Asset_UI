import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssetTypeComponent } from './list-asset-type.component';

describe('ListAssetTypeComponent', () => {
  let component: ListAssetTypeComponent;
  let fixture: ComponentFixture<ListAssetTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssetTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
