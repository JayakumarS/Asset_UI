import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkOrderComponent } from './delete-work-order.component';

describe('DeleteWorkOrderComponent', () => {
  let component: DeleteWorkOrderComponent;
  let fixture: ComponentFixture<DeleteWorkOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWorkOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
