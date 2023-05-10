import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualInformationComponent } from './individual-information.component';

describe('IndividualInformationComponent', () => {
  let component: IndividualInformationComponent;
  let fixture: ComponentFixture<IndividualInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
