import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepreciationComponent } from './list-depreciation.component';

describe('ListDepreciationComponent', () => {
  let component: ListDepreciationComponent;
  let fixture: ComponentFixture<ListDepreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDepreciationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
