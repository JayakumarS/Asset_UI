import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoleMasterComponent } from './list-role-master.component';

describe('ListRoleMasterComponent', () => {
  let component: ListRoleMasterComponent;
  let fixture: ComponentFixture<ListRoleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRoleMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
