import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSimulatorComponent } from './carousel-simulator.component';

describe('CarouselSimulatorComponent', () => {
  let component: CarouselSimulatorComponent;
  let fixture: ComponentFixture<CarouselSimulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselSimulatorComponent]
    });
    fixture = TestBed.createComponent(CarouselSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
