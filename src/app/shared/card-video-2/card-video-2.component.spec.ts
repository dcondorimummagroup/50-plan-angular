import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVideo2Component } from './card-video-2.component';

describe('CardVideo2Component', () => {
  let component: CardVideo2Component;
  let fixture: ComponentFixture<CardVideo2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardVideo2Component]
    });
    fixture = TestBed.createComponent(CardVideo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
