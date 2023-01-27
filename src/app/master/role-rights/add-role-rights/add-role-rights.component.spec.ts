import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleRightsComponent } from './add-role-rights.component';

describe('AddRoleRightsComponent', () => {
  let component: AddRoleRightsComponent;
  let fixture: ComponentFixture<AddRoleRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoleRightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
