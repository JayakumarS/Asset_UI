import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetProfileViewComponent } from './asset-profile-view.component';

describe('AssetProfileViewComponent', () => {
  let component: AssetProfileViewComponent;
  let fixture: ComponentFixture<AssetProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetProfileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
