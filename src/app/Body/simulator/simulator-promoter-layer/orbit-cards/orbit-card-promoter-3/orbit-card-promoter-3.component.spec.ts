import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardPromoter3Component } from './orbit-card-promoter-3.component';

describe('OrbitCardPromoter3Component', () => {
  let component: OrbitCardPromoter3Component;
  let fixture: ComponentFixture<OrbitCardPromoter3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardPromoter3Component]
    });
    fixture = TestBed.createComponent(OrbitCardPromoter3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
