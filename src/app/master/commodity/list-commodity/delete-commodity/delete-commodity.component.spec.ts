import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommodityComponent } from './delete-commodity.component';

describe('DeleteCommodityComponent', () => {
  let component: DeleteCommodityComponent;
  let fixture: ComponentFixture<DeleteCommodityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCommodityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
