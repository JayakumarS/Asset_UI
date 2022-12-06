import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBooComponent } from './delete-boo.component';

describe('DeleteBooComponent', () => {
  let component: DeleteBooComponent;
  let fixture: ComponentFixture<DeleteBooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
