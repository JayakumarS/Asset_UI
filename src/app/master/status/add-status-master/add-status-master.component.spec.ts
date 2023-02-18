import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatusMasterComponent } from './add-status-master.component';

describe('AddStatusMasterComponent', () => {
  let component: AddStatusMasterComponent;
  let fixture: ComponentFixture<AddStatusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStatusMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
