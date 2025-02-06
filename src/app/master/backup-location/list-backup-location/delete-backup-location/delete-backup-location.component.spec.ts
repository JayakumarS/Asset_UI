import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBackupLocationComponent } from './delete-backup-location.component';

describe('DeleteBackupLocationComponent', () => {
  let component: DeleteBackupLocationComponent;
  let fixture: ComponentFixture<DeleteBackupLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBackupLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBackupLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
