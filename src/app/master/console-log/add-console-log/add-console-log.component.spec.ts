import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsoleLogComponent } from './add-console-log.component';

describe('AddConsoleLogComponent', () => {
  let component: AddConsoleLogComponent;
  let fixture: ComponentFixture<AddConsoleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConsoleLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsoleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
