import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInventoryReportsComponent } from './list-inventory-reports.component';

describe('ListInventoryReportsComponent', () => {
  let component: ListInventoryReportsComponent;
  let fixture: ComponentFixture<ListInventoryReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInventoryReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInventoryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
