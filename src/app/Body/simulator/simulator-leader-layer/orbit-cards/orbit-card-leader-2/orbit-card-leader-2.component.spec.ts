import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader2Component } from './orbit-card-leader-2.component';

describe('OrbitCardLeader2Component', () => {
  let component: OrbitCardLeader2Component;
  let fixture: ComponentFixture<OrbitCardLeader2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader2Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
