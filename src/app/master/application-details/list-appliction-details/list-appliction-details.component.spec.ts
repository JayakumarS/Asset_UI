import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplictionDetailsComponent } from './list-appliction-details.component';

describe('ListApplictionDetailsComponent', () => {
  let component: ListApplictionDetailsComponent;
  let fixture: ComponentFixture<ListApplictionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListApplictionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApplictionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
