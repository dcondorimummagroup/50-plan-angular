import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesSimulatorComponent } from './licenses-simulator.component';

describe('LicensesSimulatorComponent', () => {
  let component: LicensesSimulatorComponent;
  let fixture: ComponentFixture<LicensesSimulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicensesSimulatorComponent]
    });
    fixture = TestBed.createComponent(LicensesSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
