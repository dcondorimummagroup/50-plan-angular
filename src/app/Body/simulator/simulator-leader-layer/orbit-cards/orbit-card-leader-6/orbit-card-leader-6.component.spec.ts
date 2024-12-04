import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader6Component } from './orbit-card-leader-6.component';

describe('OrbitCardLeader6Component', () => {
  let component: OrbitCardLeader6Component;
  let fixture: ComponentFixture<OrbitCardLeader6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader6Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
