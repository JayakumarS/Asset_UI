import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuditableAssetComponent } from './add-auditable-asset.component';

describe('AddAuditableAssetComponent', () => {
  let component: AddAuditableAssetComponent;
  let fixture: ComponentFixture<AddAuditableAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAuditableAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuditableAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
