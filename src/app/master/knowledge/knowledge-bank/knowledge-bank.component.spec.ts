import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBankComponent } from './knowledge-bank.component';

describe('KnowledgeBankComponent', () => {
  let component: KnowledgeBankComponent;
  let fixture: ComponentFixture<KnowledgeBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
