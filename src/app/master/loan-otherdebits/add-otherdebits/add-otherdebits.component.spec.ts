import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherdebitsComponent } from './add-otherdebits.component';

describe('AddOtherdebitsComponent', () => {
  let component: AddOtherdebitsComponent;
  let fixture: ComponentFixture<AddOtherdebitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOtherdebitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtherdebitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
