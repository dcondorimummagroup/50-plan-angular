import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardPromoter2Component } from './orbit-card-promoter-2.component';

describe('OrbitCardPromoter2Component', () => {
  let component: OrbitCardPromoter2Component;
  let fixture: ComponentFixture<OrbitCardPromoter2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardPromoter2Component]
    });
    fixture = TestBed.createComponent(OrbitCardPromoter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
