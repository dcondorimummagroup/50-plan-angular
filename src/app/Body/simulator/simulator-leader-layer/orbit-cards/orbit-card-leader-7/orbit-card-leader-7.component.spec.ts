import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader7Component } from './orbit-card-leader-7.component';

describe('OrbitCardLeader7Component', () => {
  let component: OrbitCardLeader7Component;
  let fixture: ComponentFixture<OrbitCardLeader7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader7Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
