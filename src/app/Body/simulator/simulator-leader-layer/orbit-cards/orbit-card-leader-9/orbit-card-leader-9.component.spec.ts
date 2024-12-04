import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader9Component } from './orbit-card-leader-9.component';

describe('OrbitCardLeader9Component', () => {
  let component: OrbitCardLeader9Component;
  let fixture: ComponentFixture<OrbitCardLeader9Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader9Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
