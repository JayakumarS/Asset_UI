import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesingnationMasterComponent } from './add-desingnation-master.component';

describe('AddDesingnationMasterComponent', () => {
  let component: AddDesingnationMasterComponent;
  let fixture: ComponentFixture<AddDesingnationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDesingnationMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesingnationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
