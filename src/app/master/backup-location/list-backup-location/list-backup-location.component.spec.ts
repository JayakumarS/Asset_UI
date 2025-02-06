import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBackupLocationComponent } from './list-backup-location.component';

describe('ListBackupLocationComponent', () => {
  let component: ListBackupLocationComponent;
  let fixture: ComponentFixture<ListBackupLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBackupLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBackupLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
