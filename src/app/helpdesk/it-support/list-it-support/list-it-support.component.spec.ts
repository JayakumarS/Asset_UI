import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItSupportComponent } from './list-it-support.component';

describe('ListItSupportComponent', () => {
  let component: ListItSupportComponent;
  let fixture: ComponentFixture<ListItSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
