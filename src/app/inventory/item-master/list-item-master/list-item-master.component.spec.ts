import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemMasterComponent } from './list-item-master.component';

describe('ListItemMasterComponent', () => {
  let component: ListItemMasterComponent;
  let fixture: ComponentFixture<ListItemMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
