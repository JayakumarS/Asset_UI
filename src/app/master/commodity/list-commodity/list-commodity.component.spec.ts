import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommodityComponent } from './list-commodity.component';

describe('ListCommodityComponent', () => {
  let component: ListCommodityComponent;
  let fixture: ComponentFixture<ListCommodityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommodityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
