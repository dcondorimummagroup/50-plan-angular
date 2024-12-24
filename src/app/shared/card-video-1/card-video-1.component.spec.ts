import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVideo1Component } from './card-video-1.component';

describe('CardVideo1Component', () => {
  let component: CardVideo1Component;
  let fixture: ComponentFixture<CardVideo1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardVideo1Component]
    });
    fixture = TestBed.createComponent(CardVideo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
