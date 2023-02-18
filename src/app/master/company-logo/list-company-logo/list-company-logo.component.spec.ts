import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyLogoComponent } from './list-company-logo.component';

describe('ListCompanyLogoComponent', () => {
  let component: ListCompanyLogoComponent;
  let fixture: ComponentFixture<ListCompanyLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanyLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
