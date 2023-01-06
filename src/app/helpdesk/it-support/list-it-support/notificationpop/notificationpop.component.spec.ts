import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationpopComponent } from './notificationpop.component';

describe('NotificationpopComponent', () => {
  let component: NotificationpopComponent;
  let fixture: ComponentFixture<NotificationpopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationpopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
