import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHistoryReportComponent } from './add-history-report.component';

describe('AddHistoryReportComponent', () => {
  let component: AddHistoryReportComponent;
  let fixture: ComponentFixture<AddHistoryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHistoryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
