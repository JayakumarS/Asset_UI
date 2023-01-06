import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGrnComponent } from './delete-grn.component';

describe('DeleteGrnComponent', () => {
  let component: DeleteGrnComponent;
  let fixture: ComponentFixture<DeleteGrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
