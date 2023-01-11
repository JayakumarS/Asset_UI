import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemMasterComponent } from './delete-item-master.component';

describe('DeleteItemMasterComponent', () => {
  let component: DeleteItemMasterComponent;
  let fixture: ComponentFixture<DeleteItemMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteItemMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
