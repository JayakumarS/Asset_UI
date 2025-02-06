import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationDetailsComponent } from './add-application-details.component';

describe('AddApplicationDetailsComponent', () => {
  let component: AddApplicationDetailsComponent;
  let fixture: ComponentFixture<AddApplicationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
