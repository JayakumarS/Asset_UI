import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBackupLocationComponent } from './view-backup-location.component';

describe('ViewBackupLocationComponent', () => {
  let component: ViewBackupLocationComponent;
  let fixture: ComponentFixture<ViewBackupLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBackupLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBackupLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
