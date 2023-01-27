import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsergroupComponent } from './add-usergroup.component';

describe('AddUsergroupComponent', () => {
  let component: AddUsergroupComponent;
  let fixture: ComponentFixture<AddUsergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
