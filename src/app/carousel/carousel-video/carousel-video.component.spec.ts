import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselVideoComponent } from './carousel-video.component';

describe('CarouselVideoComponent', () => {
  let component: CarouselVideoComponent;
  let fixture: ComponentFixture<CarouselVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselVideoComponent]
    });
    fixture = TestBed.createComponent(CarouselVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
