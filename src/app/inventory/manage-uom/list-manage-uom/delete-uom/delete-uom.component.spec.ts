import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUomComponent } from './delete-uom.component';

describe('DeleteUomComponent', () => {
  let component: DeleteUomComponent;
  let fixture: ComponentFixture<DeleteUomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
