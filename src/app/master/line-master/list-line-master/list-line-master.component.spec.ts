import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLineMasterComponent } from './list-line-master.component';

describe('ListLineMasterComponent', () => {
  let component: ListLineMasterComponent;
  let fixture: ComponentFixture<ListLineMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLineMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLineMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
