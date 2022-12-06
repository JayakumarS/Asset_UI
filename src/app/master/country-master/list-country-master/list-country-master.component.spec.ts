import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountryMasterComponent } from './list-country-master.component';

describe('ListCountryMasterComponent', () => {
  let component: ListCountryMasterComponent;
  let fixture: ComponentFixture<ListCountryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCountryMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCountryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
