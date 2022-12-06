import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesEntryComponent } from './add-sales-entry.component';

describe('AddSalesEntryComponent', () => {
  let component: AddSalesEntryComponent;
  let fixture: ComponentFixture<AddSalesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
