import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPrintComponent } from './asset-print.component';

describe('AssetQRPrintComponent', () => {
  let component: AssetPrintComponent;
  let fixture: ComponentFixture<AssetPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
