import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorInvestorComponent } from './simulator-investor.component';

describe('SimulatorInvestorComponent', () => {
  let component: SimulatorInvestorComponent;
  let fixture: ComponentFixture<SimulatorInvestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulatorInvestorComponent]
    });
    fixture = TestBed.createComponent(SimulatorInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
