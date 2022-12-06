import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeliveryNoteComponent } from './list-delivery-note.component';

describe('ListDeliveryNoteComponent', () => {
  let component: ListDeliveryNoteComponent;
  let fixture: ComponentFixture<ListDeliveryNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeliveryNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeliveryNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
