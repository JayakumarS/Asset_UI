import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReferralCodeComponent } from './delete-referral-code.component';

describe('DeleteReferralCodeComponent', () => {
  let component: DeleteReferralCodeComponent;
  let fixture: ComponentFixture<DeleteReferralCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReferralCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReferralCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
