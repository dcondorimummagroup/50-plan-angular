import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardPromoter4Component } from './orbit-card-promoter-4.component';

describe('OrbitCardPromoter4Component', () => {
  let component: OrbitCardPromoter4Component;
  let fixture: ComponentFixture<OrbitCardPromoter4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardPromoter4Component]
    });
    fixture = TestBed.createComponent(OrbitCardPromoter4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
