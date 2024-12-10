import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorMobilePromoterComponent } from './simulator-mobile-promoter.component';

describe('SimulatorMobilePromoterComponent', () => {
  let component: SimulatorMobilePromoterComponent;
  let fixture: ComponentFixture<SimulatorMobilePromoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulatorMobilePromoterComponent]
    });
    fixture = TestBed.createComponent(SimulatorMobilePromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
