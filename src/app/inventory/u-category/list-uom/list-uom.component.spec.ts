import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUomComponent } from './list-uom.component';

describe('ListUomComponent', () => {
  let component: ListUomComponent;
  let fixture: ComponentFixture<ListUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
