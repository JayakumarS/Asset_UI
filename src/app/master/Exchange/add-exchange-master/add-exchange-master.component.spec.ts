import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExchangeMasterComponent } from './add-exchange-master.component';

describe('AddExchangeMasterComponent', () => {
  let component: AddExchangeMasterComponent;
  let fixture: ComponentFixture<AddExchangeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExchangeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExchangeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
