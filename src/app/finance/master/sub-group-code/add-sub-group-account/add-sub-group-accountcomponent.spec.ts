import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubGroupAccountComponent } from './add-sub-group-account.component';

describe('AddSubGroupAccountComponent', () => {
  let component: AddSubGroupAccountComponent;
  let fixture: ComponentFixture<AddSubGroupAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubGroupAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubGroupAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
