import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialSuccessComponentComponent } from './trial-success-component.component';

describe('TrialSuccessComponentComponent', () => {
  let component: TrialSuccessComponentComponent;
  let fixture: ComponentFixture<TrialSuccessComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialSuccessComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialSuccessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
