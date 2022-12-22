import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteauditComponent } from './deleteaudit.component';

describe('DeleteauditComponent', () => {
  let component: DeleteauditComponent;
  let fixture: ComponentFixture<DeleteauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteauditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
