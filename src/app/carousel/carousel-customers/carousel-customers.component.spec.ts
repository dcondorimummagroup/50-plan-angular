import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCustomersComponent } from './carousel-customers.component';

describe('CarouselCustomersComponent', () => {
  let component: CarouselCustomersComponent;
  let fixture: ComponentFixture<CarouselCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselCustomersComponent]
    });
    fixture = TestBed.createComponent(CarouselCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
