import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselNosotrosComponent } from './carousel-nosotros.component';

describe('CarouselNosotrosComponent', () => {
  let component: CarouselNosotrosComponent;
  let fixture: ComponentFixture<CarouselNosotrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselNosotrosComponent]
    });
    fixture = TestBed.createComponent(CarouselNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
