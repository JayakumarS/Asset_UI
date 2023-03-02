import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConsoleLogComponent } from './delete-console-log.component';

describe('DeleteConsoleLogComponent', () => {
  let component: DeleteConsoleLogComponent;
  let fixture: ComponentFixture<DeleteConsoleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConsoleLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConsoleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
