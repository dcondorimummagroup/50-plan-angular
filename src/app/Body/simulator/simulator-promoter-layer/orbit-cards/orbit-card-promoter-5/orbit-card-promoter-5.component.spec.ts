import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardPromoter5Component } from './orbit-card-promoter-5.component';

describe('OrbitCardPromoter5Component', () => {
  let component: OrbitCardPromoter5Component;
  let fixture: ComponentFixture<OrbitCardPromoter5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardPromoter5Component]
    });
    fixture = TestBed.createComponent(OrbitCardPromoter5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
