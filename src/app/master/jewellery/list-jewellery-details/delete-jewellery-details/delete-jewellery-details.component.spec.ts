import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJewelleryDetailsComponent } from './delete-jewellery-details.component';

describe('DeleteJewelleryDetailsComponent', () => {
  let component: DeleteJewelleryDetailsComponent;
  let fixture: ComponentFixture<DeleteJewelleryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteJewelleryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteJewelleryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
