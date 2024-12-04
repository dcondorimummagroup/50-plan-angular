import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader3Component } from './orbit-card-leader-3.component';

describe('OrbitCardLeader3Component', () => {
  let component: OrbitCardLeader3Component;
  let fixture: ComponentFixture<OrbitCardLeader3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader3Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
