import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatdynamicmenuComponent } from './matdynamicmenu.component';

describe('MatdynamicmenuComponent', () => {
  let component: MatdynamicmenuComponent;
  let fixture: ComponentFixture<MatdynamicmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatdynamicmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatdynamicmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
