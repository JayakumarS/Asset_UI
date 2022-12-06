import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousePositioningComponent } from './warehouse-positioning.component';

describe('WarehousePositioningComponent', () => {
  let component: WarehousePositioningComponent;
  let fixture: ComponentFixture<WarehousePositioningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousePositioningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousePositioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
