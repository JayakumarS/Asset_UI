import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPopupReferralCodeComponent } from './add-popup-referral-code.component';

describe('AddPopupReferralCodeComponent', () => {
  let component: AddPopupReferralCodeComponent;
  let fixture: ComponentFixture<AddPopupReferralCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPopupReferralCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPopupReferralCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
