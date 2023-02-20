import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaxMasterComponent } from './delete-tax-master.component';

describe('DeleteTaxMasterComponent', () => {
  let component: DeleteTaxMasterComponent;
  let fixture: ComponentFixture<DeleteTaxMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaxMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaxMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
