import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserMasterComponent } from './list-user-master.component';

describe('ListUserMasterComponent', () => {
  let component: ListUserMasterComponent;
  let fixture: ComponentFixture<ListUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
