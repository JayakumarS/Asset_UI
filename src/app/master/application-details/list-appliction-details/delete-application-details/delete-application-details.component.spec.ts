import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApplicationDetailsComponent } from './delete-application-details.component';

describe('DeleteApplicationDetailsComponent', () => {
  let component: DeleteApplicationDetailsComponent;
  let fixture: ComponentFixture<DeleteApplicationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteApplicationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
