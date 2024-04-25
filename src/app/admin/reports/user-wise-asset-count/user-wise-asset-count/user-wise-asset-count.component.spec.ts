import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWiseAssetCountComponent } from './user-wise-asset-count.component';

describe('UserWiseAssetCountComponent', () => {
  let component: UserWiseAssetCountComponent;
  let fixture: ComponentFixture<UserWiseAssetCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWiseAssetCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWiseAssetCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
