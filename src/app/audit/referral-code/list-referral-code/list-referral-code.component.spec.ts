import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReferralCodeComponent } from './list-referral-code.component';

describe('ListReferralCodeComponent', () => {
  let component: ListReferralCodeComponent;
  let fixture: ComponentFixture<ListReferralCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReferralCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReferralCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
