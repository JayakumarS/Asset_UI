import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatnestedmenuComponent } from './matnestedmenu.component';

describe('MatnestedmenuComponent', () => {
  let component: MatnestedmenuComponent;
  let fixture: ComponentFixture<MatnestedmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatnestedmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatnestedmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
