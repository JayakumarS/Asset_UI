import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFundComponent } from './delete-fund.component';

describe('DeleteFundComponent', () => {
  let component: DeleteFundComponent;
  let fixture: ComponentFixture<DeleteFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
