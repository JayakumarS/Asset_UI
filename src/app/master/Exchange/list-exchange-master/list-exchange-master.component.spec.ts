import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExchangeMasterComponent } from './list-exchange-master.component';

describe('ListExchangeMasterComponent', () => {
  let component: ListExchangeMasterComponent;
  let fixture: ComponentFixture<ListExchangeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExchangeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExchangeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
