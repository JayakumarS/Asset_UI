import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUtilityReportComponent } from './list-utility-report.component';

describe('ListUtilityReportComponent', () => {
  let component: ListUtilityReportComponent;
  let fixture: ComponentFixture<ListUtilityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUtilityReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUtilityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
