import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepreciationReportComponent } from './add-depreciation-report.component';

describe('AddDepreciationReportComponent', () => {
  let component: AddDepreciationReportComponent;
  let fixture: ComponentFixture<AddDepreciationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepreciationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepreciationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
