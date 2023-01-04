import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteitsupportComponent } from './deleteitsupport.component';

describe('DeleteitsupportComponent', () => {
  let component: DeleteitsupportComponent;
  let fixture: ComponentFixture<DeleteitsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteitsupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteitsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
