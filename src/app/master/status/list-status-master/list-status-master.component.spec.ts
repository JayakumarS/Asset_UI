import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStatusMasterComponent } from './list-status-master.component';

describe('ListStatusMasterComponent', () => {
  let component: ListStatusMasterComponent;
  let fixture: ComponentFixture<ListStatusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStatusMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStatusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
