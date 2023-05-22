import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJewelleryReportComponent } from './add-jewellery-report.component';

describe('AddJewelleryReportComponent', () => {
  let component: AddJewelleryReportComponent;
  let fixture: ComponentFixture<AddJewelleryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJewelleryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJewelleryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
