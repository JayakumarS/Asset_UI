import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesingnationMasterComponent } from './list-desingnation-master.component';

describe('ListDesingnationMasterComponent', () => {
  let component: ListDesingnationMasterComponent;
  let fixture: ComponentFixture<ListDesingnationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDesingnationMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesingnationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
