import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorSignupComponent } from './auditor-signup.component';

describe('AuditorSignupComponent', () => {
  let component: AuditorSignupComponent;
  let fixture: ComponentFixture<AuditorSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
