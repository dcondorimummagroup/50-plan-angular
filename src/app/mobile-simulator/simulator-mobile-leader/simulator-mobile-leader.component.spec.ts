import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorMobileLeaderComponent } from './simulator-mobile-leader.component';

describe('SimulatorMobileLeaderComponent', () => {
  let component: SimulatorMobileLeaderComponent;
  let fixture: ComponentFixture<SimulatorMobileLeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulatorMobileLeaderComponent]
    });
    fixture = TestBed.createComponent(SimulatorMobileLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
