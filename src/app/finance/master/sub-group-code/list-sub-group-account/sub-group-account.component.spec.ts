import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubGroupAccountComponent } from './list-sub-group-account.component';

describe('ListSubGroupAccountComponent', () => {
  let component: ListSubGroupAccountComponent;
  let fixture: ComponentFixture<ListSubGroupAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubGroupAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubGroupAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
