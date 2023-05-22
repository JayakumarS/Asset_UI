import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMutualfundReportComponent } from './add-mutualfund-report.component';

describe('AddMutualfundReportComponent', () => {
  let component: AddMutualfundReportComponent;
  let fixture: ComponentFixture<AddMutualfundReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMutualfundReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMutualfundReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
