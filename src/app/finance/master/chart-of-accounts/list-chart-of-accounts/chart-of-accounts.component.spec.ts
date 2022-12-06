import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChartOfAccountsComponent } from './list-chart-of-accounts.component';

describe('ListChartOfAccountsComponent', () => {
  let component: ListChartOfAccountsComponent;
  let fixture: ComponentFixture<ListChartOfAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChartOfAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChartOfAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
