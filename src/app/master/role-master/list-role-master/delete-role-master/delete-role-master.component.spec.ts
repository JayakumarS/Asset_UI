import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoleMasterComponent } from './delete-role-master.component';

describe('DeleteRoleMasterComponent', () => {
  let component: DeleteRoleMasterComponent;
  let fixture: ComponentFixture<DeleteRoleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRoleMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRoleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
