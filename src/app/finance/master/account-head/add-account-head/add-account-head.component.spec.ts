import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountHeadComponent } from './add-account-head.component';

describe('AddAccountHeadComponent', () => {
  let component: AddAccountHeadComponent;
  let fixture: ComponentFixture<AddAccountHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccountHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
