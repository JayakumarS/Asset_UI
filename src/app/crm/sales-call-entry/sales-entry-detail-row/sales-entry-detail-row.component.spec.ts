import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEntryDetailRowComponent } from './sales-entry-detail-row.component';

describe('SalesEntryDetailRowComponent', () => {
  let component: SalesEntryDetailRowComponent;
  let fixture: ComponentFixture<SalesEntryDetailRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesEntryDetailRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEntryDetailRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
