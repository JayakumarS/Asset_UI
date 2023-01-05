import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserMasterComponent } from './delete-user-master.component';

describe('DeleteUserMasterComponent', () => {
  let component: DeleteUserMasterComponent;
  let fixture: ComponentFixture<DeleteUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
