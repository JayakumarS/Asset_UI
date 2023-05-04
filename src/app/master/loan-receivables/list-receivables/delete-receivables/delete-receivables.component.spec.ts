import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReceivablesComponent } from './delete-receivables.component';

describe('DeleteReceivablesComponent', () => {
  let component: DeleteReceivablesComponent;
  let fixture: ComponentFixture<DeleteReceivablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReceivablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
