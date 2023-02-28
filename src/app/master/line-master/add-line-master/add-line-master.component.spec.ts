import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLineMasterComponent } from './add-line-master.component';

describe('AddLineMasterComponent', () => {
  let component: AddLineMasterComponent;
  let fixture: ComponentFixture<AddLineMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLineMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLineMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
