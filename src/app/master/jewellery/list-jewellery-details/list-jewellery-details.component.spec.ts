import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJewelleryDetailsComponent } from './list-jewellery-details.component';

describe('ListJewelleryDetailsComponent', () => {
  let component: ListJewelleryDetailsComponent;
  let fixture: ComponentFixture<ListJewelleryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJewelleryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJewelleryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
