import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDesignationMasterComponent } from './delete-designation-master.component';

describe('DeleteDesignationMasterComponent', () => {
  let component: DeleteDesignationMasterComponent;
  let fixture: ComponentFixture<DeleteDesignationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDesignationMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDesignationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
