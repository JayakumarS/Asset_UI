import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceivableComponent } from './list-receivable.component';

describe('ListReceivableComponent', () => {
  let component: ListReceivableComponent;
  let fixture: ComponentFixture<ListReceivableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReceivableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
