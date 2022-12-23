import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetransferComponent } from './deletetransfer.component';

describe('DeletetransferComponent', () => {
  let component: DeletetransferComponent;
  let fixture: ComponentFixture<DeletetransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletetransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletetransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
