import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsReturnComponent } from './assets-return.component';

describe('AssetsReturnComponent', () => {
  let component: AssetsReturnComponent;
  let fixture: ComponentFixture<AssetsReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
