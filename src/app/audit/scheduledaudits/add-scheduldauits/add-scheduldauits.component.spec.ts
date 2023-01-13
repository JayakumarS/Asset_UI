import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduldauitsComponent } from './add-scheduldauits.component';

describe('AddScheduldauitsComponent', () => {
  let component: AddScheduldauitsComponent;
  let fixture: ComponentFixture<AddScheduldauitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduldauitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScheduldauitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
