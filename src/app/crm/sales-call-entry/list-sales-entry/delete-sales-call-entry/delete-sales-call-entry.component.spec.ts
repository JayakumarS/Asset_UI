import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalesCallEntryComponent } from './delete-sales-call-entry.component';

describe('DeleteSalesCallEntryComponent', () => {
  let component: DeleteSalesCallEntryComponent;
  let fixture: ComponentFixture<DeleteSalesCallEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSalesCallEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSalesCallEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
