import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreportItemComponent } from './addreport-item.component';

describe('AddreportItemComponent', () => {
  let component: AddreportItemComponent;
  let fixture: ComponentFixture<AddreportItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreportItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
