import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeDeleteComponent } from './knowledge-delete.component';

describe('KnowledgeDeleteComponent', () => {
  let component: KnowledgeDeleteComponent;
  let fixture: ComponentFixture<KnowledgeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
