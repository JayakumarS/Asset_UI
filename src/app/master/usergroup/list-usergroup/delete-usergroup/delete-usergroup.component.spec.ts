import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUsergroupComponent } from './delete-usergroup.component';

describe('DeleteUsergroupComponent', () => {
  let component: DeleteUsergroupComponent;
  let fixture: ComponentFixture<DeleteUsergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUsergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
