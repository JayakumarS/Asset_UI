import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupHeadComponent } from './list-group-head-account.component';

describe('ListGroupHeadComponent', () => {
  let component: ListGroupHeadComponent;
  let fixture: ComponentFixture<ListGroupHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGroupHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
