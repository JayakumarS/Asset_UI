import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCountryMasterComponent } from './delete-country-master.component';

describe('DeleteCountryMasterComponent', () => {
  let component: DeleteCountryMasterComponent;
  let fixture: ComponentFixture<DeleteCountryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCountryMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCountryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
