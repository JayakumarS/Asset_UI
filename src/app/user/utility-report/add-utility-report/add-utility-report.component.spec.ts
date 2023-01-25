import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUtilityReportComponent } from './add-utility-report.component';

describe('AddUtilityReportComponent', () => {
  let component: AddUtilityReportComponent;
  let fixture: ComponentFixture<AddUtilityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUtilityReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUtilityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
