import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPrintComponent } from './inventory-print.component';

describe('InventoryPrintComponent', () => {
  let component: InventoryPrintComponent;
  let fixture: ComponentFixture<InventoryPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
