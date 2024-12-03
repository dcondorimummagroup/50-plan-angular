import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorLeaderComponent } from './simulator-leader.component';

describe('SimulatorLeaderComponent', () => {
  let component: SimulatorLeaderComponent;
  let fixture: ComponentFixture<SimulatorLeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulatorLeaderComponent]
    });
    fixture = TestBed.createComponent(SimulatorLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
