import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsoleLogComponent } from './list-console-log.component';

describe('ListConsoleLogComponent', () => {
  let component: ListConsoleLogComponent;
  let fixture: ComponentFixture<ListConsoleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConsoleLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsoleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
