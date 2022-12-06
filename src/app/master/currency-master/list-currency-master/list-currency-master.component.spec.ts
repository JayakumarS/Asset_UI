import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCurrencyMasterComponent } from './list-currency-master.component';

describe('ListCurrencyMasterComponent', () => {
  let component: ListCurrencyMasterComponent;
  let fixture: ComponentFixture<ListCurrencyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCurrencyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCurrencyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
