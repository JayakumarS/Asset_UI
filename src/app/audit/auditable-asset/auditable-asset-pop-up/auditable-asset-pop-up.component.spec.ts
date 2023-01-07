import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditableAssetPopUpComponent } from './auditable-asset-pop-up.component';

describe('AuditableAssetPopUpComponent', () => {
  let component: AuditableAssetPopUpComponent;
  let fixture: ComponentFixture<AuditableAssetPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditableAssetPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditableAssetPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
