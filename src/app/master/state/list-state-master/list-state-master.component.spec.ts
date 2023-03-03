import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStateMasterComponent } from './list-state-master.component';

describe('ListMasterComponent', () => {
  let component: ListStateMasterComponent;
  let fixture: ComponentFixture<ListStateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStateMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
