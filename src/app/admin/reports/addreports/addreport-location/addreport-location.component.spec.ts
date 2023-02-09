import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreportLocationComponent } from './addreport-location.component';

describe('AddreportLocationComponent', () => {
  let component: AddreportLocationComponent;
  let fixture: ComponentFixture<AddreportLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreportLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreportLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
