import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeader5Component } from './orbit-card-leader-5.component';

describe('OrbitCardLeader5Component', () => {
  let component: OrbitCardLeader5Component;
  let fixture: ComponentFixture<OrbitCardLeader5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeader5Component]
    });
    fixture = TestBed.createComponent(OrbitCardLeader5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
