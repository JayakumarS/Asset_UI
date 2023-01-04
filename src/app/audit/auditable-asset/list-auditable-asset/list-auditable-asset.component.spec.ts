import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuditableAssetComponent } from './list-auditable-asset.component';

describe('ListAuditableAssetComponent', () => {
  let component: ListAuditableAssetComponent;
  let fixture: ComponentFixture<ListAuditableAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAuditableAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAuditableAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
