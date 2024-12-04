import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader4Component } from './orbit-card-leader-4.component';

describe('OrbitCardLeader4Component', () => {
  let component: OrbitCardLeader4Component;
  let fixture: ComponentFixture<OrbitCardLeader4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader4Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
