import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBooComponent } from './list-boo.component';

describe('ListBooComponent', () => {
  let component: ListBooComponent;
  let fixture: ComponentFixture<ListBooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
