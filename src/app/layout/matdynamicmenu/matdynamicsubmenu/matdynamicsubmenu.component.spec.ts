import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatdynamicsubmenuComponent } from './matdynamicsubmenu.component';

describe('MatdynamicsubmenuComponent', () => {
  let component: MatdynamicsubmenuComponent;
  let fixture: ComponentFixture<MatdynamicsubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatdynamicsubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatdynamicsubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
