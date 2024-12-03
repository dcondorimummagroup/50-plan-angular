import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCardLeaderComponent } from './orbit-card-leader.component';

describe('OrbitCardLeaderComponent', () => {
  let component: OrbitCardLeaderComponent;
  let fixture: ComponentFixture<OrbitCardLeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrbitCardLeaderComponent]
    });
    fixture = TestBed.createComponent(OrbitCardLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
