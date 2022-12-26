import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteListassetComponent } from './delete-listasset.component';

describe('DeleteListassetComponent', () => {
  let component: DeleteListassetComponent;
  let fixture: ComponentFixture<DeleteListassetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteListassetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteListassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
