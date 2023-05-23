import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablesreportComponent } from './receivablesreport.component';

describe('ReceivablesreportComponent', () => {
  let component: ReceivablesreportComponent;
  let fixture: ComponentFixture<ReceivablesreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivablesreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivablesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
