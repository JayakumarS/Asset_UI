import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBackupLocationComponent } from './add-backup-location.component';

describe('AddBackupLocationComponent', () => {
  let component: AddBackupLocationComponent;
  let fixture: ComponentFixture<AddBackupLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBackupLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBackupLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
