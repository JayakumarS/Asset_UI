import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterCompanyTransferApproveComponent } from './list-inter-company-transfer-approve.component';

describe('ListCurrencyComponent', () => {
  let component: ListInterCompanyTransferApproveComponent;
  let fixture: ComponentFixture<ListInterCompanyTransferApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInterCompanyTransferApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterCompanyTransferApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
