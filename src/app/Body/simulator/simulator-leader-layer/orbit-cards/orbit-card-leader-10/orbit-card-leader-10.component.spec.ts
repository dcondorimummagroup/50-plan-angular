import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader10Component } from './orbit-card-leader-10.component';

describe('OrbitCardLeader10Component', () => {
  let component: OrbitCardLeader10Component;
  let fixture: ComponentFixture<OrbitCardLeader10Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader10Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
