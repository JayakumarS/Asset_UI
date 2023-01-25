import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMapPopupComponent } from './company-map-popup.component';

describe('CompanyMapPopupComponent', () => {
  let component: CompanyMapPopupComponent;
  let fixture: ComponentFixture<CompanyMapPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyMapPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
