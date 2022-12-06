import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterCompanyTransferComponent } from './list-inter-company-transfer.component';

describe('ListCurrencyComponent', () => {
  let component: ListInterCompanyTransferComponent;
  let fixture: ComponentFixture<ListInterCompanyTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInterCompanyTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterCompanyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
