import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader8Component } from './orbit-card-leader-8.component';

describe('OrbitCardLeader8Component', () => {
  let component: OrbitCardLeader8Component;
  let fixture: ComponentFixture<OrbitCardLeader8Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader8Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
