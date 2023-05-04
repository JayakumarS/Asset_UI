import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJewelleryDetailsComponent } from './add-jewellery-details.component';

describe('AddJewelleryDetailsComponent', () => {
  let component: AddJewelleryDetailsComponent;
  let fixture: ComponentFixture<AddJewelleryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJewelleryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJewelleryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
