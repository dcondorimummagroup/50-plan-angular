import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorMobileInvestorComponent } from './simulator-mobile-investor.component';

describe('SimulatorMobileInvestorComponent', () => {
  let component: SimulatorMobileInvestorComponent;
  let fixture: ComponentFixture<SimulatorMobileInvestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulatorMobileInvestorComponent]
    });
    fixture = TestBed.createComponent(SimulatorMobileInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
