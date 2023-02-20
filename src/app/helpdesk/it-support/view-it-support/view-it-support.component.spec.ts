import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItSupportComponent } from './view-it-support.component';

describe('ViewItSupportComponent', () => {
  let component: ViewItSupportComponent;
  let fixture: ComponentFixture<ViewItSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
