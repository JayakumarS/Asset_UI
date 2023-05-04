import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOtherdebitsComponent } from './delete-otherdebits.component';

describe('DeleteOtherdebitsComponent', () => {
  let component: DeleteOtherdebitsComponent;
  let fixture: ComponentFixture<DeleteOtherdebitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOtherdebitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOtherdebitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
