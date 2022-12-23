import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtransferComponent } from './listtransfer.component';

describe('ListtransferComponent', () => {
  let component: ListtransferComponent;
  let fixture: ComponentFixture<ListtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
