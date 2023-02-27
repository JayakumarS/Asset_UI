import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExchangeMasterComponent } from './delete-exchange-master.component';

describe('DeleteExchangeMasterComponent', () => {
  let component: DeleteExchangeMasterComponent;
  let fixture: ComponentFixture<DeleteExchangeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteExchangeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExchangeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
