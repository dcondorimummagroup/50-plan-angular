import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorPromoterComponent } from './simulator-promoter.component';

describe('SimulatorPromoterComponent', () => {
  let component: SimulatorPromoterComponent;
  let fixture: ComponentFixture<SimulatorPromoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulatorPromoterComponent]
    });
    fixture = TestBed.createComponent(SimulatorPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
