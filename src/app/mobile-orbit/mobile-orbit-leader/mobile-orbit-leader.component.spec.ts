import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOrbitLeaderComponent } from './mobile-orbit-leader.component';

describe('MobileOrbitLeaderComponent', () => {
  let component: MobileOrbitLeaderComponent;
  let fixture: ComponentFixture<MobileOrbitLeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileOrbitLeaderComponent]
    });
    fixture = TestBed.createComponent(MobileOrbitLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
