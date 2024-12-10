import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselStrategyComponent } from './carousel-strategy.component';

describe('CarouselStrategyComponent', () => {
  let component: CarouselStrategyComponent;
  let fixture: ComponentFixture<CarouselStrategyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselStrategyComponent]
    });
    fixture = TestBed.createComponent(CarouselStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
