import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountHeadComponent } from './list-account-head.component';

describe('ListAccountHeadComponent', () => {
  let component: ListAccountHeadComponent;
  let fixture: ComponentFixture<ListAccountHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccountHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccountHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
