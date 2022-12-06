import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalesEntryComponent } from './list-sales-entry.component';

describe('ListSalesEntryComponent', () => {
  let component: ListSalesEntryComponent;
  let fixture: ComponentFixture<ListSalesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSalesEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
