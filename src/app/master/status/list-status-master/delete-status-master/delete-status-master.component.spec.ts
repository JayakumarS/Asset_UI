import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStatusMasterComponent } from './delete-status-master.component';

describe('DeleteStatusMasterComponent', () => {
  let component: DeleteStatusMasterComponent;
  let fixture: ComponentFixture<DeleteStatusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteStatusMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStatusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
