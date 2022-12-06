import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGatePassComponent } from './list-gate-pass.component';

describe('ListGatePassComponent', () => {
  let component: ListGatePassComponent;
  let fixture: ComponentFixture<ListGatePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGatePassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
