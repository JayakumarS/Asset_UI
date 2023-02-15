import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBankRecieptsComponent } from './list-bank-reciepts.component';

describe('ListBankRecieptsComponent', () => {
  let component: ListBankRecieptsComponent;
  let fixture: ComponentFixture<ListBankRecieptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBankRecieptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBankRecieptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
