import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAddCustomerComponent } from './multiple-add-customer.component';

describe('MultipleAddCustomerComponent', () => {
  let component: MultipleAddCustomerComponent;
  let fixture: ComponentFixture<MultipleAddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleAddCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
