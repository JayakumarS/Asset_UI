import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBomComponent } from './delete-bom.component';

describe('DeleteBomComponent', () => {
  let component: DeleteBomComponent;
  let fixture: ComponentFixture<DeleteBomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
