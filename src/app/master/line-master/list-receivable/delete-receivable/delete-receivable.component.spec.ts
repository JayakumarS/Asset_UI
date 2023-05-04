import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReceivableComponent } from './delete-receivable.component';

describe('DeleteReceivableComponent', () => {
  let component: DeleteReceivableComponent;
  let fixture: ComponentFixture<DeleteReceivableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReceivableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
