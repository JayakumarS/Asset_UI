import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOtherdebitsComponent } from './list-otherdebits.component';

describe('ListOtherdebitsComponent', () => {
  let component: ListOtherdebitsComponent;
  let fixture: ComponentFixture<ListOtherdebitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOtherdebitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOtherdebitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
