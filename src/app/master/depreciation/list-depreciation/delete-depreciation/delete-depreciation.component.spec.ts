import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepreciationComponent } from './delete-depreciation.component';

describe('DeleteDepreciationComponent', () => {
  let component: DeleteDepreciationComponent;
  let fixture: ComponentFixture<DeleteDepreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDepreciationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDepreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
