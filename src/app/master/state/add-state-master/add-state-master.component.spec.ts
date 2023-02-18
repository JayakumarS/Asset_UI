import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStateMasterComponent } from './add-state-master.component';

describe('AddStateMasterComponent', () => {
  let component: AddStateMasterComponent;
  let fixture: ComponentFixture<AddStateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStateMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
