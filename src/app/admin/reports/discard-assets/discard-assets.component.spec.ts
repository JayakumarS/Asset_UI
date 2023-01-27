import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardAssetsComponent } from './discard-assets.component';

describe('DiscardAssetsComponent', () => {
  let component: DiscardAssetsComponent;
  let fixture: ComponentFixture<DiscardAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscardAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
