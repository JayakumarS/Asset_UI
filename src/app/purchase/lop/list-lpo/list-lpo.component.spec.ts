import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLpoComponent } from './list-lpo.component';

describe('ListLpoComponent', () => {
  let component: ListLpoComponent;
  let fixture: ComponentFixture<ListLpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
