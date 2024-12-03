import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardPromoterComponent } from './orbit-card-promoter.component';

describe('OrbitCardPromoterComponent', () => {
  let component: OrbitCardPromoterComponent;
  let fixture: ComponentFixture<OrbitCardPromoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardPromoterComponent]
    });
    fixture = TestBed.createComponent(OrbitCardPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
