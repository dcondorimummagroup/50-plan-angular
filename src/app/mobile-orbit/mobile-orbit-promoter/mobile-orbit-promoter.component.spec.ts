import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOrbitPromoterComponent } from './mobile-orbit-promoter.component';

describe('MobileOrbitPromoterComponent', () => {
  let component: MobileOrbitPromoterComponent;
  let fixture: ComponentFixture<MobileOrbitPromoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileOrbitPromoterComponent]
    });
    fixture = TestBed.createComponent(MobileOrbitPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
