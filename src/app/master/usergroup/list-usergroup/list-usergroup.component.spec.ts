import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsergroupComponent } from './list-usergroup.component';

describe('ListUsergroupComponent', () => {
  let component: ListUsergroupComponent;
  let fixture: ComponentFixture<ListUsergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
