import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterCompanyTransferComponent } from './add-inter-company-transfer.component';

describe('AddInterCompanyTransferComponent', () => {
  let component: AddInterCompanyTransferComponent;
  let fixture: ComponentFixture<AddInterCompanyTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterCompanyTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterCompanyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
