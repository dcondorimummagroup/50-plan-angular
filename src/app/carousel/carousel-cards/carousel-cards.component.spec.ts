import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCardsComponent } from './carousel-cards.component';

describe('CarouselCardsComponent', () => {
  let component: CarouselCardsComponent;
  let fixture: ComponentFixture<CarouselCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselCardsComponent]
    });
    fixture = TestBed.createComponent(CarouselCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
