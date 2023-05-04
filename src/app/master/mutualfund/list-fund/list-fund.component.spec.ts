import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFundComponent } from './list-fund.component';

describe('ListFundComponent', () => {
  let component: ListFundComponent;
  let fixture: ComponentFixture<ListFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
